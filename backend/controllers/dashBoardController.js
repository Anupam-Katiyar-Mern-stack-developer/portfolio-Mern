import Project from "../models/Project.js";
import Skill from "../models/Skills.js";
import Experience from "../models/Experience.js";
import Contact from "../models/Message.js";
import Activity from "../models/Activity.js";
import Visitors from "../models/Visitors.js";
import ResumeDownload from "../models/ResumeDownload.js";
import { getGrowth } from "../utils/growthHelper.js";

export const getDashboard = async (req, res) => {
  try {
    const [
      projectCount,
      skillCount,
      experienceCount,
      messageCount,
      visitorCount,
      resumeDownloadCount,
    ] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Experience.countDocuments(),
      Contact.countDocuments(),
      Visitors.countDocuments(),
      ResumeDownload.countDocuments(),
    ]);

    const [
      projectGrowth,
      skillGrowth,
      experienceGrowth,
      messageGrowth,
      visitorGrowth,
      resumeDownloadGrowth,
    ] = await Promise.all([
      getGrowth(Project),
      getGrowth(Skill),
      getGrowth(Experience),
      getGrowth(Contact),
      getGrowth(Visitors),
      getGrowth(ResumeDownload),
    ]);

    const latestContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const experiences = await Experience.find();

    const skills = await Skill.find().sort({ createdAt: -1 });

    let totalMonths = 0;

    experiences.forEach((exp) => {
      const duration = exp.duration.toLowerCase();

      const yearMatch = duration.match(/(\d+)\s*year/);
      const monthMatch = duration.match(/(\d+)\s*month/);

      if (yearMatch) {
        totalMonths += parseInt(yearMatch[1]) * 12;
      }

      if (monthMatch) {
        totalMonths += parseInt(monthMatch[1]);
      }
    });

    const totalExperience = Number((totalMonths / 12).toFixed(1));

    const activities = await Activity.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      projectCount,
      skillCount,
      experienceCount,
      messageCount,
      latestContacts,
      activities,
      visitorCount,
      resumeDownloadCount,
      skills,
      experiences,

      growth: {
        projects: projectGrowth,
        skills: skillGrowth,
        experiences: experienceGrowth,
        messages: messageGrowth,
        visitors: visitorGrowth,
        resumeDownloads: resumeDownloadGrowth,
      },
      totalExperience,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        status: "Read",
      },
      {
        new: true,
      },
    );

    res.json(contact);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
