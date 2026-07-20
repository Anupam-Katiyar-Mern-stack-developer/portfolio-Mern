import Experience from "../models/Experience.js";
import Activity from "../models/Activity.js";
// ==========================
// CREATE EXPERIENCE
// ==========================

export const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);

    await Activity.create({
      title: "Experience Added",
      type: "experience",
    });

    res.status(201).json({
      success: true,
      message: "Experience Added Successfully",
      experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// GET ALL EXPERIENCE
// ==========================

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: experiences.length,
      experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// GET SINGLE EXPERIENCE
// ==========================

export const getExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience Not Found",
      });
    }

    res.status(200).json({
      success: true,
      experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// UPDATE EXPERIENCE
// ==========================

export const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience Updated Successfully",
      experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// DELETE EXPERIENCE
// ==========================

export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
