import { NextRequest, NextResponse } from "next/server";
import { clientPromise } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const doctorId = params.get("doctorId")?.trim();
    const search = (params.get("search") ?? "").trim();

    if (!doctorId || !ObjectId.isValid(doctorId)) {
      return NextResponse.json(
        { message: "Valid Doctor ID is required." },
        { status: 400 },
      );
    }

    const page = Math.max(1, Number(params.get("page")) || 1);
    const limit = 20;

    // Get today's date boundaries in the server's local timezone.
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const client = await clientPromise;
    const db = client.db("test");
    const patientsCollection = db.collection("patients");

    const filter: Record<string, unknown> = {
      doctorId,
      registeredAt: {
        $gte: start,
        $lt: end,
      },
    };

    // Optional search by patient name, email, or phone.
    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(escaped, "i");

      filter.$or = [{ name: pattern }, { email: pattern }, { phone: pattern }];
    }

    const [patients, total] = await Promise.all([
      patientsCollection
        .find(filter)
        .sort({ registeredAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),

      patientsCollection.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      patients: patients.map((patient) => ({
        ...patient,
        _id: patient._id.toString(),
        assignedDoctorId: patient.doctorId ?? null,
      })),
      pagination: {
        page,
        limit,
        total,
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    console.error("Today's patients fetch error:", error);

    return NextResponse.json(
      { message: "Unable to fetch today's patients." },
      { status: 500 },
    );
  }
}
