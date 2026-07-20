import mongoose from "mongoose";

const resumeDownloadSchema = new mongoose.Schema(
  {
    ip: String,
    userAgent: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ResumeDownload", resumeDownloadSchema);