import mongoose from "mongoose";

const tableschema = new mongoose.Schema({
    name: {
        type: String,

    },
    age: {
        type: Number,


    }
})

export default mongoose.model.First || mongoose.model("First", tableschema);
