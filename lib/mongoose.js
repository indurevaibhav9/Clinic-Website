import mongoose from "mongoose";
const MONGODB_URI=process.env.MONGODB_URI;

export async function connectDB() {
  try{
 if(mongoose.connection.readyState>=1){
  console.log("MongoDb Already Connected");
  return;
 }
 await mongoose.connect(MONGODB_URI);
 console.log("MD Connected Successfully");
  }
  catch(err){
   console.log("Connection Error",err);
  }
}


