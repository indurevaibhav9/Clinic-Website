
import { NextRequest, NextResponse } from "next/server";
import { clientPromise } from "@/lib/db";
import { ObjectId } from "mongodb";
import { publishPatientRegistered } from "@/lib/patient-events";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();
    const doctorId = String(body.doctorId ?? "").trim();

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and phone are required.",
        },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB and select the test database
    const client = await clientPromise;
    const db = client.db("test");

    // Create patient record in the separate patients collection
    const now = new Date();

    const patient = {
      name,
      email,
      phone,
      doctorId: doctorId || null,
      registeredAt: now,
      createdAt: now,
      updatedAt: now,
    };

    const result = await db
      .collection("patients")
      .insertOne(patient);

      // Notify connected patient-list pages after the insert succeeds.
publishPatientRegistered({
  patientId: result.insertedId.toString(),
  doctorId: patient.doctorId,
});


    return NextResponse.json(
      {
        success: true,
        message: "Patient registered successfully.",
        patient: {
          id: result.insertedId.toString(),
          ...patient,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Patient registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to register patient.",
      },
      { status: 500 }
    );
  }
}

export async function GET(request:NextRequest) {
 try{
    const params=request.nextUrl.searchParams;
    const page=Math.max(1,Number(params.get("page"))||1);
    const limit=20;
    const search=(params.get("search")??"").trim();
    const doctorId=params.get("doctorId");
    const todayOnly=params.get("today")==="true";
    
    if(!doctorId||!ObjectId.isValid(doctorId)){
      return NextResponse.json({
        message:"Valid Doctor ID is required"  
      },{status:400});
    }
    const client=await clientPromise;
    const db=client.db("test");
    const filter:Record<string,unknown>={
     doctorId :doctorId
    };
    if(todayOnly){
      const start=new Date();
      start.setHours(0,0,0,0);
      const end=new Date(start);
      end.setDate(end.getDate()+1);
      filter.registeredAt ={ $gte: start, $lt: end };
    }
    if(search){
      const escaped=search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern=new RegExp(escaped,"i");
      filter.$or=[
         { name: pattern },
        { email: pattern },
        { phone: pattern },
      ];
    }

    const patientsCollection=db.collection("patients");
   
    const [patients,total]=await Promise.all([
      patientsCollection.
      find(filter)
      .sort({registeredAt:-1})
      .skip((page-1)*limit)
      .limit(limit)
      .toArray(),
    patientsCollection.countDocuments(filter),
    ]);
    return NextResponse.json({
    patients:patients.map((patient)=>({
      ...patient,
      _id:patient._id.toString(),
      assignedDoctorId:patient.doctorId??null,
    })) ,
    pagination:{
      page,
      limit,
      total,
      hasMore:page*limit<total
    },
    });
 } 
 catch{
 return NextResponse.json(
  {message:"unable to fetch patients"},
  {status:500}
 );
 }  
}