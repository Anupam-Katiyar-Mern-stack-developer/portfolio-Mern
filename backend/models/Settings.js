import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    profile: {
      name: {
        type: String,
        default: "Admin",
      },
      email: {
        type: String,
        default: "admin@gmail.com",
      },
      bio: {
        type: String,
        default: "MERN Developer",
      },
    },

    portfolio: {
      title: {
        type: String,
        default: "My Portfolio",
      },
      tagline: {
        type: String,
        default: "Full Stack Developer",
      },
      resume: {
        type: String,
        default: "",
      },
    },

    contact: {
      email: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      location: {
        type: String,
        default: "",
      },
    },

    social: {
      github: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
    },

    theme: {
      darkMode: {
        type: Boolean,
        default: false,
      },
      primaryColor: {
        type: String,
        default: "blue",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Settings", settingsSchema);