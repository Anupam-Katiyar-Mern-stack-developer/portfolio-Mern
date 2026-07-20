import mongoose from 'mongoose';
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb conected successfully");
    }catch(error){
        console.log("DB Erorr",error.message);
    }
}

export default connectDB;