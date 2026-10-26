import { connectDB } from "../../../../lib/mongoose";
import table from "../../../../models/First";
import {NextResponse } from "next/server";

export async function GET(req,{params}) {
  try{
  await connectDB();
  const {id}= await params;
  const tabledata=await table.findById(id);
  return NextResponse.json({
    message:"Data fetch succesfull",
    data:tabledata
  })
  }
  catch(err){
   return NextResponse.json({
    "message":"Data Fetched Failed",
   })
  }
}
export async function DELETE(req,{params}) {
  try{
await connectDB();
const {id}=await params;
const tabledata=await table.findByIdAndDelete(id);
return NextResponse.json({
  message:"Data Deleted",
  data:tabledata
})

  }
  catch(err){
    return NextResponse.json({
      message:"Delete Failed"
    })
  }
}

export async function PUT(req,{params}) {
  try{
    await connectDB();
  const {id}=await params;
  const body=await req.json();
  const tabledata=await table.findByIdAndUpdate(
    id,
    body,
    {new:true}
  )
  return NextResponse.json({
    message:"Data updated",
    data:tabledata
  })
  }
  catch(err){
    return NextResponse.json({
      message:"Failed to update"
    })
  }
}

