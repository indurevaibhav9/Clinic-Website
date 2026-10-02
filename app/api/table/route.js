import { connectDB } from "../../../lib/mongoose";
import table from "../../../models/First";
import {NextResponse} from "next/server";

export async function GET() {
  try{
  await connectDB();
  const tabledata=await table.find();
  return NextResponse.json({
    message:"Data fetched",
    data:tabledata
  })
  }
  catch(err){
    console.log("Error",err);
    return NextResponse.json({
      message:"Falied to Fetch Data ",
     
    })
  }
}

export async function POST(req) {
  try{
    await connectDB();
  const body=await req.json();
 
  const tabledata=await table.create(body);
  return NextResponse.json({
    message:"Data Added successfully",
    data:tabledata
  })
  }
  catch(err){
   console.log("Error",err);
   return NextResponse.json({
    message:"Failed to create Data",
   
   })
  }
}