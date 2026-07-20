import Visitor from "../models/Visitors.js";

export const addVisitor = async (req, res) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    const existingVisitor = await Visitor.findOne({ ip });

    if (!existingVisitor) {
      await Visitor.create({
        ip,
        userAgent: req.headers["user-agent"],
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};