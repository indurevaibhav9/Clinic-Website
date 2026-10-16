
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { toFile } from "groq-sdk";
import { clientPromise } from "@/lib/db";
import {groq} from "@/lib/groq";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ patientId: string }> }
) {
  try {
    // 1. Get patient ID from route parameters
    const { patientId } = await params;

    if (!ObjectId.isValid(patientId)) {
      return NextResponse.json(
        { message: "Invalid patient ID." },
        { status: 400 }
      );
    }

    // 2. Read multipart form data
    const formData = await request.formData();
    const audio = formData.get("audio");
    const doctorId = String(formData.get("doctorId") ?? "").trim();

    if (!(audio instanceof File) || audio.size === 0) {
      return NextResponse.json(
        { message: "Audio recording is required." },
        { status: 400 }
      );
    }

    if (audio.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { message: "Audio must be 25 MB or smaller." },
        { status: 413 }
      );
    }

    if (!ObjectId.isValid(doctorId)) {
      return NextResponse.json(
        { message: "Invalid doctor ID." },
        { status: 400 }
      );
    }

    // 3. Connect to MongoDB
    const mongoClient = await clientPromise;
    const db = mongoClient.db("test");

    // 4. Find the patient.
    // The current patients schema stores doctorId as a string.
    const patient = await db.collection("patients").findOne({
      _id: new ObjectId(patientId),
      doctorId: doctorId,
    });

    if (!patient) {
      return NextResponse.json(
        { message: "Patient not found for this doctor." },
        { status: 404 }
      );
    }

    // 5. Convert uploaded audio into a Groq-compatible file
    const buffer = Buffer.from(await audio.arrayBuffer());

    const groqFile = await toFile(
      buffer,
      audio.name || "consultation.webm",
      { type: audio.type || "audio/webm" }
    );

    // 6. Transcribe the audio
    const transcription = await groq.audio.transcriptions.create({
      file: groqFile,
      model: "whisper-large-v3-turbo",
      response_format: "json",
    });

    const transcript = transcription.text.trim();

    if (!transcript) {
      return NextResponse.json(
        { message: "No speech could be transcribed." },
        { status: 422 }
      );
    }

    // 7. Generate structured consultation notes
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
You assist doctors by organizing consultation transcripts.
Return valid JSON with these fields:
{
  "summary": "Concise summary of what was discussed",
  "keyPoints": ["Important point 1", "Important point 2"],
  "followUp": ["Follow-up item 1"]
}

Use only information supported by the transcript.
Do not invent symptoms, diagnoses, medications, or treatment.
If information is missing, say it is not documented.
These notes are a draft for clinician review, not a diagnosis.
          `.trim(),
        },
        {
          role: "user",
          content: `Organize this consultation transcript:\n${transcript}`,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content;

    if (!raw) {
      throw new Error("Groq did not return consultation notes.");
    }

    const notes = JSON.parse(raw) as {
      summary: string;
      keyPoints: string[];
      followUp: string[];
    };

    // 8. Save the consultation in test.consultations
    const now = new Date();

    const result = await db.collection("consultations").insertOne({
      patientId: new ObjectId(patientId),
      doctorId: doctorId,
      transcript,
      summary: notes.summary,
      keyPoints: notes.keyPoints,
      followUp: notes.followUp,
      status: "draft",
      createdAt: now,
      updatedAt: now,
    });

    // 9. Return the result
    return NextResponse.json(
      {
        success: true,
        message: "Consultation processed successfully.",
        consultation: {
          id: result.insertedId.toString(),
          patientId,
          doctorId,
          transcript,
          summary: notes.summary,
          keyPoints: notes.keyPoints,
          followUp: notes.followUp,
          status: "draft",
          createdAt: now,
          updatedAt: now,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Consultation processing error:", error);

    return NextResponse.json(
      { message: "Failed to process the consultation." },
      { status: 500 }
    );
  }
}