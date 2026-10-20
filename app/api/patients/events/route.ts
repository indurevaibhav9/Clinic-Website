import { subscribeToPatientEvents } from "@/lib/patient-events";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const doctorId = request.nextUrl.searchParams.get("doctorId");

  if (!doctorId) {
    return new Response("doctorId is required", { status: 400 });
  }

  const encoder = new TextEncoder();
  let unsubscribe = () => {};
  let heartbeat: ReturnType<typeof setInterval> | undefined;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
        );
      };

      send("connected", { success: true });

      unsubscribe = subscribeToPatientEvents((event) => {
        if (event.doctorId === doctorId) {
          send("patient-registered", event);
        }
      });

      heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": heartbeat\n\n"));
        } catch {
          // The connection may already be closed.
        }
      }, 20_000);

      request.signal.addEventListener(
        "abort",
        () => {
          unsubscribe();

          if (heartbeat) clearInterval(heartbeat);

          try {
            controller.close();
          } catch {
            // The connection may already be closed.
          }
        },
        { once: true }
      );
    },

    cancel() {
      unsubscribe();

      if (heartbeat) clearInterval(heartbeat);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}