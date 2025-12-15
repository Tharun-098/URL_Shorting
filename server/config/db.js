import mongoose from "mongoose";
import env_variable from "./env.js";

const connectDB=async()=>{
    try{
        await mongoose.connect(env_variable.mongodb_url);
        console.log("MongoDB connected successfully");
    }
    catch(err){
        console.log("MongoDB connection Failed",err.message);
    }
}

export default connectDB;