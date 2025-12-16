require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error.message);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  const { firstname,lastname, email, message } = req.body;

  // Validation
  if (!firstname || !lastname || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      error: "All fields are required." 
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      error: "Invalid email address." 
    });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.TO_EMAIL,
      subject: `New Contact from ${firstname} ${lastname}`,
      text: `Name: ${firstname} ${lastname}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <p><strong>Name:</strong> ${firstname} ${lastname}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <strong>Message:</strong>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Sent from your portfolio website contact form
          </p>
        </div>
      `,
    });

    console.log(`✅ Email sent from ${firstname} ${lastname} (${email})`);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
    res.status(500).json({ 
      success: false, 
      error: "Failed to send email. Please try again later." 
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
