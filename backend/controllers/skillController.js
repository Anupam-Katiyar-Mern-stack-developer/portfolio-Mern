import Skills from "../models/Skills.js";
import Activity from "../models/Activity.js";
// create Skills

export const createSkill = async (req, res) => {
  try {
    const { name, category, level, icon } = req.body;
    const skill = await Skills.create({
      name,
      category,
      level,
      icon,
    });

    await Activity.create({
      title: "Skill Added",
      type: "skill",
    });
    res.status(201).json({
      success: true,
      message: "Skill Added Successfully",
      skill,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all skills

export const getSkills = async (req, res) => {
  try {
    const skills = await Skills.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: skills.length,
      skills,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get single Skill

export const getSkill = async (req, res) => {
  try {
    const skill = await Skills.find(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      skill,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update skill
export const updateSkill = async (req, res) => {
  try {
    const skill = await Skills.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill Not Found",
      });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Skill Updated Successfully",
      skill: updatedSkill,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete skill

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skills.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill Not Found",
      });
    }

    await skill.deleteOne();

    res.status(200).json({
      success: true,
      message: "Skill Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
