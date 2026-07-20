import mongoose from "mongoose";


const skillSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    category:{
        type:String,
        
    },
    level:{
        type:String,
        enum:["Beginner","Intermediate","Advanced","Professional"],
        default:"Beginner",

    },
    icon:{
        type:String,
        default:"",
    },

},{timestamps:true,}
);

export default mongoose.model("skill",skillSchema);