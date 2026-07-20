import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import Activity from "../models/Activity.js";
// create Project\
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      liveLink,
      githubLink,
      technologies,
      category,
      status,
      featured,

      role,
      problem,
      insight,
      solution,
      impact,
      features,
    } = req.body;

    let image = "";
    let public_id = "";

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "portfolio/projects",
      );

      image = result.secure_url;
      public_id = result.public_id;
    }

    const project = await Project.create({
      title,
      description,

      liveLink,
      githubLink,

      technologies:
        typeof technologies === "string"
          ? JSON.parse(technologies)
          : technologies,

      category,
      status,

      featured: featured === "true" || featured === true,

      role,
      problem,
      insight,
      solution,
      impact,

      features: typeof features === "string" ? JSON.parse(features) : features,

      image,
      public_id,
    });

    await Activity.create({
      title: "New Project Added",
      type: "project",
    });

    res.status(201).json({
      success: true,
      message: "Project Created Successfully",
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get all products

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: projects.length,
      projects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get single project

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "project Not Found ",
      });
    }
    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update project

export const updateProject = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,

      liveLink: req.body.liveLink,
      githubLink: req.body.githubLink,

      category: req.body.category,
      status: req.body.status,

      role: req.body.role,
      problem: req.body.problem,
      insight: req.body.insight,
      solution: req.body.solution,
      impact: req.body.impact,

      featured: req.body.featured === "true" || req.body.featured === true,
    };

    if (req.body.technologies) {
      updateData.technologies =
        typeof req.body.technologies === "string"
          ? JSON.parse(req.body.technologies)
          : req.body.technologies;
    }

    if (req.body.features) {
      updateData.features =
        typeof req.body.features === "string"
          ? JSON.parse(req.body.features)
          : req.body.features;
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found",
      });
    }

    if (req.file) {
      if (project.public_id) {
        await cloudinary.uploader.destroy(project.public_id);
      }

      const result = await uploadToCloudinary(
        req.file.buffer,
        "portfolio/projects",
      );

      updateData.image = result.secure_url;
      updateData.public_id = result.public_id;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
     updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Project Updated Successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Project

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found",
      });
    }

    if (project.public_id) {

    await cloudinary.uploader.destroy(project.public_id);

}

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "project Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
