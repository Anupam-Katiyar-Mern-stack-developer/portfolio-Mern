import mongoose from "mongoose";

const educationSchema=new mongoose.Schema({
    degree:{
        type:String,
        required:true,
    },
    institute:{
        type:String,
        required:true,
    },
    year:{
        type:String,
        required:true,
    },
    grade:{
        type:String,
        default:"",
    },
}, {timestamps:true,}
);

export default mongoose.model("Education",educationSchema);
