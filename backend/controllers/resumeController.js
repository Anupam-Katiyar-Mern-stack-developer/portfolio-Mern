import Resume from "../models/Resume.js";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import ResumeDownload from "../models/ResumeDownload.js";
import axios from "axios";
// ==========================
// GET RESUME
// ==========================
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// CREATE / UPDATE RESUME
// ==========================
export const createResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload resume.",
      });
    }

    let resume = await Resume.findOne();

    // Delete old resume
    if (resume?.public_id) {
      await cloudinary.uploader.destroy(resume.public_id, {
        resource_type: "raw",
      });
    }

    // Upload PDF
    const result = await uploadToCloudinary(
      req.file.buffer,
      "portfolio/resume",
      "raw",
      "Anupam_Resume",
    );

    if (resume) {
      resume.title = req.body.title || "My Resume";
      resume.file = result.secure_url;
      resume.public_id = result.public_id;

      await resume.save();
    } else {
      resume = await Resume.create({
        title: req.body.title || "My Resume",
        file: result.secure_url,
        public_id: result.public_id,
      });
    }

    res.json({
      success: true,
      message: "Resume uploaded successfully.",
      resume,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// DELETE RESUME
// ==========================
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    if (resume.public_id) {
      await cloudinary.uploader.destroy(resume.public_id, {
        resource_type: "auto",
      });
    }

    await resume.deleteOne();

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const downloadResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Download Count
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    const userAgent = req.headers["user-agent"];

    const alreadyDownloaded = await ResumeDownload.findOne({
      ip,
      userAgent,
    });

    if (!alreadyDownloaded) {
      await ResumeDownload.create({
        ip,
        userAgent,
      });
    }

    // Cloudinary se PDF fetch
    const response = await axios.get(resume.file, {
      responseType: "stream",
    });

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Anupam_Resume.pdf"',
    );

    res.setHeader("Content-Type", "application/pdf");

    response.data.pipe(res);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
