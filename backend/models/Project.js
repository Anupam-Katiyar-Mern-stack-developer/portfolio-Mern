import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    public_id: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "Frontend",
        "Backend",
        "Full Stack",
        "Mobile App",
        "UI/UX",
        "API",
        "Other",
      ],
      default: "Other",
    },

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },

    liveLink: {
      type: String,
      default: "",
    },

    githubLink: {
      type: String,
      default: "",
    },

    technologies: [
      {
        type: String,
      },
    ],

    // NEW FIELDS

    role: {
      type: String,
      default: "",
    },

    problem: {
      type: String,
      default: "",
    },

    insight: {
      type: String,
      default: "",
    },

    solution: {
      type: String,
      default: "",
    },

    impact: {
      type: String,
      default: "",
    },

    features: [
      {
        type: String,
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);