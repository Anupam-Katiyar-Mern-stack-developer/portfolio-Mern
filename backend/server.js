import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import settingRoutes from "./routes/settingsRoutes.js";
import dashboardRoutes from "./routes/dashBoardRoutes.js"
import visitorRoutes from "./routes/visitorRoutes.js";



import http from "http";
import { Server } from "socket.io";
import socketHandler from "./socket/socket.js";
import chatRoutes from "./routes/chatRoutes.js";


dotenv.config();
connectDB();

const app = express();


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      
      "https://glittery-phoenix-14e9f9.netlify.app",
      "https://portfolio-frontend.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});


socketHandler(io);

app.use(cors({
  origin: [
    
    "https://glittery-phoenix-14e9f9.netlify.app",
    "https://portfolio-frontend.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/visitor", visitorRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
