const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
console.log("🔥 LOADED EMAIL SERVICE:", __filename);
class EmailService {

    constructor() {

        this.transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
port: Number(process.env.EMAIL_PORT),
secure: false,
auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
}
});

        this.transporter.verify((error, success) => {
    if (error) {
        console.error("EMAIL ERROR:", error);
    } else {
        console.log("✅ EMAIL Ready");
    }
});

    }

    loadTemplate(file) {

        return fs.readFileSync(

            path.join(
                __dirname,
                "templates",
                file
            ),

            "utf8"

        );

    }

    

async sendEmail(to, subject, html) {
    console.log("\n========== BLYNK EMAIL TEST ==========");
    console.log("FROM:", JSON.stringify(process.env.EMAIL_FROM));
    console.log("TO:", JSON.stringify(to));
    console.log("SUBJECT:", JSON.stringify(subject));

    try {
        const info = await this.transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: to,
            subject: subject,
            html: html,
        });

        console.log("========== NODEMAILER RESULT ==========");
        console.dir(info, { depth: null });
        console.log("========================================\n");

        return info;

    } catch (error) {
        console.error("========== EMAIL FAILED ==========");
        console.error(error);
        console.error("==================================");

        throw error;
    }
}

async sendVerificationEmail(user, token) {

    const frontendUrl =
        process.env.FRONTEND_URL || "http://localhost:5173";

    const verifyUrl =
        `${frontendUrl}/verify-email?token=${encodeURIComponent(token)}`;

    console.log("=================================");
    console.log("EMAIL VERIFICATION");
    console.log("USER:", user.email);
    console.log("TOKEN:", token);
    console.log("FRONTEND_URL:", frontendUrl);
    console.log("VERIFY URL:", verifyUrl);
    console.log("=================================");

    let html = this.loadTemplate("verify-email.html");

    const name =
        user.firstName ||
        user.username ||
        "there";

    html = html
        .replace(/{{NAME}}/g, name)
        .replace(/{{VERIFY_URL}}/g, verifyUrl)
        .replace(/{{YEAR}}/g, new Date().getFullYear());

    console.log("NAME INSERTED:", !html.includes("{{NAME}}"));
    console.log("VERIFY URL INSERTED:", html.includes(verifyUrl));
    console.log("LEFTOVER VERIFY PLACEHOLDER:", html.includes("{{VERIFY_URL}}"));
    console.log("LEFTOVER NAME PLACEHOLDER:", html.includes("{{NAME}}"));

    console.log("FINAL VERIFY URL IN EMAIL:", verifyUrl);

    return this.sendEmail(
        user.email,
        "Verify your BLYNK account",
        html
    );
}

    async sendResetPasswordEmail(user, token) {

        const resetUrl =
`${process.env.APP_URL}/api/auth/reset-password?token=${token}`;

        let html =
this.loadTemplate("reset-password.html");

        html = html
            .replace(/{{NAME}}/g, user.firstName || user.username)
            .replace(/{{RESET_URL}}/g, resetUrl);

        return this.sendEmail(

            user.email,

            "Reset your BLYNK password",

            html

        );

    }

    async sendWelcomeEmail(user) {

        let html =
this.loadTemplate("welcome.html");

        html = html.replace(

            /{{NAME}}/g,

            user.firstName || user.username

        );

        return this.sendEmail(

            user.email,

            "Welcome to BLYNK",

            html

        );

    }

}

module.exports = new EmailService();