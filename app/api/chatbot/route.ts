import { NextResponse } from "next/server";
import { generateChatbotReply } from "@/lib/chatbot/chatbot.service";
import type { ChatMessage, ChatbotRequest, ChatbotResponse } from "@/lib/chatbot/chatbot.types";
import { success } from "zod";
import { PartialProjectOptions } from "next/dist/build/swc/types";
export const runtime = "nodejs";

export async function GET() {
    return NextResponse.json({
        success: true,
        message: "MediFast Chatbot API is running.",
        endpoint: "POST /api/chatbot",
    });
}

export async function POST(request: Request) {
    try {
        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json({
                success: false,
                error: "Chatbot API configuration is missing.",
            },
                { status: 500 }
            );
        }
        const body = (await request.json()) as Partial<ChatbotRequest>;
        if (typeof body.message !== "string" || !body.message.trim()) {
            return NextResponse.json({
                success: false,
                error: "Please Enter A Message.",
            }, { status: 400 })
        }
        if (body.message.length > 2000) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Message must not exceed 2000 characters."
                },
                { status: 400 }
            );
        }
        const history: ChatMessage[] = Array.isArray(body.history)
            ? body.history
                .filter(
                    (item): item is ChatMessage =>
                        item !== null &&
                        typeof item === "object" &&
                        (item.role === "user" ||
                            item.role === "assistant") &&
                        typeof item.content === "string"
                )
                .slice(-10)
                .map((item) => ({
                    role: item.role,
                    content: item.content.slice(0, 2000),
                }))
            : [];
        const reply = await generateChatbotReply(
            body.message.trim(),
            history
        );

        return NextResponse.json({
            success: true,
            reply,
        });

    }
    catch (error) {
        console.error("Chatbot API error:", error);
        return NextResponse.json({
            success: false,
            error: "Unable to generate a response. Please try again.",
        },
            { status: 500 }
        );
    }
}