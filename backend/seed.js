import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

dotenv.config();

await connectDB();

await Admin.deleteMany();

await Admin.create({
  name: "admin",
  password: "123456",
});

console.log("✅ Admin Created");

process.exit();