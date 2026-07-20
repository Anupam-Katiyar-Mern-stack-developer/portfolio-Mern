import Message from "../models/Message.js";
import Activity from "../models/Activity.js";
import transporter from "../config/mail.js";
// ===============================
// SEND MESSAGE (Portfolio)
// ===============================

export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📩 New Portfolio Message from ${name}`,
      html: `
      <div style="font-family:Arial;padding:20px">

      <h2>🚀 New Portfolio Contact</h2>

      <hr>

      <p><b>Name :</b> ${name}</p>

      <p><b>Email :</b> ${email}</p>

      <p><b>Subject :</b> ${subject}</p>

      <p><b>Message :</b></p>

      <p>${message}</p>

    </div>`,
    
    });

    await Activity.create({
      title: "New Contact Message",
      type: "message",
    });

    res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL MESSAGES (Admin)
// ===============================

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: messages.length,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE MESSAGE
// ===============================

export const getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// MARK AS READ
// ===============================

export const markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
      },
      {
        new: true,
      },
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message Marked as Read",
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE MESSAGE
// ===============================

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const contact = await Message.findByIdAndUpdate(
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
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const count = await Message.countDocuments({
      isRead: false,
    });

    res.json({
      count,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
