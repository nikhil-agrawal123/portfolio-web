const nodemailer = require("nodemailer");

// User input is interpolated into an HTML email below. Without escaping, anyone can put
// arbitrary markup (links, images, spoofed content) into the mail you receive.
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const LIMITS = { firstname: 100, lastname: 100, email: 254, message: 5000 };

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { firstname, lastname, email, message } = req.body;

  // Validation
  if (!firstname || !lastname || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields are required.",
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Invalid email address.",
    });
  }

  const tooLong = Object.entries(LIMITS).find(
    ([field, max]) => String({ firstname, lastname, email, message }[field]).length > max,
  );
  if (tooLong) {
    return res.status(400).json({
      success: false,
      error: `${tooLong[0]} is too long (max ${tooLong[1]} characters).`,
    });
  }

  const safe = {
    firstname: escapeHtml(firstname),
    lastname: escapeHtml(lastname),
    email: escapeHtml(email),
    message: escapeHtml(message),
  };

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
          <p><strong>Name:</strong> ${safe.firstname} ${safe.lastname}</p>
          <p><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <strong>Message:</strong>
            <p style="white-space: pre-wrap;">${safe.message}</p>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Sent from your portfolio website contact form
          </p>
        </div>
      `,
    });

    console.log(`✅ Email sent from ${firstname} ${lastname} (${email})`);
    return res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
    return res.status(500).json({
      success: false,
      error: "Failed to send email. Please try again later.",
    });
  }
};
