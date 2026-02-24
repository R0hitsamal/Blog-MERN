const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",  
  auth: {
    user: process.env.myMail,
    pass: appPassword, 
  },
});

const sendMailResister = async (toEmail, username) => {
  try {
    const info = await transporter.sendMail({
      from: `"GITAVERSE" <${process.env.myMail}>`,
      to: toEmail,
      subject: "Welcome to GITAVERSE 🎉",
      html: `
        <h2>Welcome ${username} 🎉</h2>
        <p>Thank you for signing up.</p>
      `,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.log("Email error:", error);
  }
};

module.exports = { sendMailResister };