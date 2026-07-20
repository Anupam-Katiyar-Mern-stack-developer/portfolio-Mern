import Education from "../models/Education.js";

// ==========================
// CREATE EDUCATION
// ==========================

export const createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body);

    res.status(201).json({
      success: true,
      message: "Education Added Successfully",
      education,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// GET ALL EDUCATIONS
// ==========================

export const getEducations = async (req, res) => {
  try {
    const educations = await Education.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: educations.length,
      educations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// GET SINGLE EDUCATION
// ==========================

export const getEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education Not Found",
      });
    }

    res.status(200).json({
      success: true,
      education,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// UPDATE EDUCATION
// ==========================

export const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Education Updated Successfully",
      education,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// DELETE EDUCATION
// ==========================

export const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Education Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};