const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }

});

// ======================
// SEND EMAIL
// ======================

async function sendMail({ to, subject, html }) {

  try {

    const result = await transporter.sendMail({

      from: `"BLYNK PLATFORM" <${process.env.MAIL_USER}>`,

      to,

      subject,

      html

    });

    return result;

  } catch (err) {

    console.error("MAIL_ERROR:", err);

    throw new Error("Email sending failed");

  }

}

// ======================
// TEMPLATES
// ======================

const templates = {

  welcome: (name) => `
    <h2>Welcome ${name}</h2>
    <p>Welcome to BLYNK Social Platform.</p>
  `,

  verifyEmail: (link) => `
    <h2>Email Verification</h2>
    <p>Click below to verify your account:</p>
    <a href="${link}">Verify Email</a>
  `,

  resetPassword: (link) => `
    <h2>Password Reset</h2>
    <p>Click below to reset your password:</p>
    <a href="${link}">Reset Password</a>
  `,

  announcement: (title, message) => `
    <h2>${title}</h2>
    <p>${message}</p>
  `

};

// ======================
// MAILER API
// ======================

module.exports = {

  sendMail,

  templates,

  sendWelcome: (to, name) =>
    sendMail({
      to,
      subject: "Welcome to BLYNK",
      html: templates.welcome(name)
    }),

  sendVerification: (to, link) =>
    sendMail({
      to,
      subject: "Verify Your Email",
      html: templates.verifyEmail(link)
    }),

  sendResetPassword: (to, link) =>
    sendMail({
      to,
      subject: "Reset Password",
      html: templates.resetPassword(link)
    }),

  sendAnnouncement: (to, title, message) =>
    sendMail({
      to,
      subject: title,
      html: templates.announcement(title, message)
    })

};