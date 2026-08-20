const fs = require("fs");
const path = require("path");

console.log("🔥 LOADED EMAIL SERVICE:", __filename);

class EmailService {

    constructor() {

        console.log("📧 INITIALIZING BREVO API");

        this.apiKey = process.env.BREVO_API_KEY;

        if (!this.apiKey) {
            console.error("❌ BREVO_API_KEY NOT FOUND");
        } else {
            console.log("✅ BREVO_API_KEY FOUND");
        }

        console.log("EMAIL_FROM:", process.env.EMAIL_FROM);
        console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
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

        console.log("\n========== BLYNK EMAIL ==========");
        console.log("FROM:", process.env.EMAIL_FROM);
        console.log("TO:", to);
        console.log("SUBJECT:", subject);

        if (!this.apiKey) {
            throw new Error("BREVO_API_KEY is not configured");
        }

        try {

            const response = await fetch(
                "https://api.brevo.com/v3/smtp/email",
                {
                    method: "POST",

                    headers: {
                        "accept": "application/json",
                        "api-key": this.apiKey,
                        "content-type": "application/json"
                    },

                    body: JSON.stringify({

                        sender: {
                            name: "BLYNK",
                            email: "noreply@blynk.co.za"
                        },

                        to: [
                            {
                                email: to
                            }
                        ],

                        subject: subject,

                        htmlContent: html

                    })
                }
            );

            const data = await response.json();

            console.log("BREVO STATUS:", response.status);
            console.log("BREVO RESPONSE:", data);

            if (!response.ok) {

                throw new Error(
                    data?.message ||
                    `Brevo API error: ${response.status}`
                );

            }

            console.log("✅ EMAIL SENT");

            return data;

        } catch (error) {

            console.error("========== BREVO EMAIL FAILED ==========");
            console.error(error);
            console.error("========================================");

            throw error;
        }
    }

    async sendVerificationEmail(user, token) {

        const frontendUrl =
            process.env.FRONTEND_URL ||
            "https://blynk.co.za";

        const verifyUrl =
            `${frontendUrl}/verify-email?token=${encodeURIComponent(token)}`;

        console.log("=================================");
        console.log("EMAIL VERIFICATION");
        console.log("USER:", user.email);
        console.log("FRONTEND_URL:", frontendUrl);
        console.log("VERIFY URL:", verifyUrl);
        console.log("=================================");

        let html =
            this.loadTemplate("verify-email.html");

        const name =
    user.firstName ||
    user.displayName ||
    user.username ||
    "there";

const username =
    user.username || "";

const subscription =
    user.subscriptionPlan || "FREE_MEMBER";

const role =
    user.role || "member";

const referralCode =
    user.referralCode || "Not available";

        html = html
           .replace(/{{NAME}}/g, name)
    .replace(/{{USERNAME}}/g, username)
    .replace(/{{SUBSCRIPTION}}/g, subscription)
    .replace(/{{ROLE}}/g, role)
    .replace(/{{REFERRAL_CODE}}/g, referralCode)
    .replace(/{{VERIFY_URL}}/g, verifyUrl)
    .replace(/{{YEAR}}/g, new Date().getFullYear());
        

        console.log(
            "VERIFY URL INSERTED:",
            html.includes(verifyUrl)
        );

        return this.sendEmail(
            user.email,
            "Verify your BLYNK account",
            html
        );
    }

    async sendResetPasswordEmail(user, token) {

        const frontendUrl =
            process.env.FRONTEND_URL ||
            "https://blynk.co.za";

        const resetUrl =
            `${frontendUrl}/reset-password?token=${encodeURIComponent(token)}`;

        let html =
            this.loadTemplate("reset-password.html");

        html = html
            .replace(
                /{{NAME}}/g,
                user.firstName ||
                user.username ||
                "there"
            )
            .replace(
                /{{RESET_URL}}/g,
                resetUrl
            );

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
            user.firstName ||
            user.username ||
            "there"
        );

        return this.sendEmail(
            user.email,
            "Welcome to BLYNK",
            html
        );
    }
}

module.exports = new EmailService();