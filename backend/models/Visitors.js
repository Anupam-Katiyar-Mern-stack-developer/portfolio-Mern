import mongoose, { mongo } from "mongoose";

const visitorSchema=new mongoose.Schema({
    ip:String,
    userAgent:String,
},{timestamps:true,}
);


export default mongoose.model("Visitor",visitorSchema);