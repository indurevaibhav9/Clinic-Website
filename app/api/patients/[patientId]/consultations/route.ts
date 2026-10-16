
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { clientPromise } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ patientId: string }> }
) {
  try {
    const { patientId } = await params;

    if (!ObjectId.isValid(patientId)) {
      return NextResponse.json(
        { message: "Invalid patient ID." },
        { status: 400 }
      );
    }

    const mongoClient = await clientPromise;
    const db = mongoClient.db("test");

    const consultations = await db
      .collection("consultations")
      .find({ patientId: new ObjectId(patientId) })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      consultations: consultations.map((consultation) => ({
        id: consultation._id.toString(),
        patientId: consultation.patientId.toString(),
        doctorId: consultation.doctorId,
        transcript: consultation.transcript,
        summary: consultation.summary,
        keyPoints: consultation.keyPoints,
        followUp: consultation.followUp,
        status: consultation.status,
        createdAt: consultation.createdAt,
        updatedAt: consultation.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Fetch consultations error:", error);

    return NextResponse.json(
      { message: "Failed to fetch consultations." },
      { status: 500 }
    );
  }
}






// import { NextRequest,NextResponse } from "next/server";
// import { ObjectId } from "mongodb";
// import { clientPromise } from "@/lib/db";

// export const runtime="nodejs"

// export async function GET(request:NextRequest,{params}:{params:Promise<{patientId:string}>}){
    // try{
    //  const {patientId}=await params;
    //  if(!ObjectId.isValid(patientId)){
        // return NextResponse.json(
            // {message:"Invalid Patient Id"},
        // {status:400});
    //  }
    //  const mongoClient=await clientPromise;
    //  const db=mongoClient.db("test");

    //  const consultations=await db.collection("consultations")
    //  .find({patientId:new ObjectId(patientId)})
    //  .sort({createdAt:-1})
    //  .toArray();

    //  return NextResponse.json({
        // success:true,
        // consultations: consultations.map((consultation) => ({
        // id: consultation._id.toString(),
        // patientId: consultation.patientId.toString(),
        // doctorId: consultation.doctorId,
        // transcript: consultation.transcript,
        // summary: consultation.summary,
        // keyPoints: consultation.keyPoints,
        // followUp: consultation.followUp,
        // status: consultation.status,
        // createdAt: consultation.createdAt,
        // updatedAt: consultation.updatedAt,
    //   })),
    //  });
    // }
    // catch(error){
    //  return NextResponse.json(
        // {message:"Failed to Fetch consultations"},
        // {status:500}
    // )
    // }
// }