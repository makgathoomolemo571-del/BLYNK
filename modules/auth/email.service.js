const fs = require("fs");
const path = require("path");
const brevo = require("@getbrevo/brevo");

console.log("🔥 LOADED EMAIL SERVICE:", __filename);

class EmailService {

    constructor() {

        console.log("📧 INITIALIZING BREVO API");

        if (!process.env.BREVO_API_KEY) {
            console.error(
                "❌ BREVO_API_KEY IS MISSING"
            );
        } else {
            console.log(
                "✅ BREVO_API_KEY FOUND"
            );
        }

        this.api = new brevo.TransactionalEmailsApi();

        this.api.setApiKey(
            brevo.TransactionalEmailsApiApiKeys.apiKey,
            process.env.BREVO_API_KEY
        );
        this.transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },

    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,

    tls: {
        minVersion: "TLSv1.2"
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

        console.log(
            "\n========== BLYNK EMAIL =========="
        );

        console.log(
            "FROM:",
            process.env.EMAIL_FROM
        );

        console.log(
            "TO:",
            to
        );

        console.log(
            "SUBJECT:",
            subject
        );

        try {

            const email =
                new brevo.SendSmtpEmail();

            email.sender = {
                name: "BLYNK",
                email:
                    process.env.EMAIL_FROM_EMAIL ||
                    "noreply@blynk.co.za"
            };

            email.to = [
                {
                    email: to
                }
            ];

            email.subject = subject;

            email.htmlContent = html;


            const result =
                await this.api.sendTransacEmail(
                    email
                );


            console.log(
                "========== BREVO API SUCCESS =========="
            );

            console.dir(
                result,
                { depth: null }
            );

            console.log(
                "========================================"
            );


            return result;

        } catch (error) {

            console.error(
                "========== BREVO API FAILED =========="
            );

            console.error(
                error?.response?.body ||
                error?.body ||
                error
            );

            console.error(
                "======================================"
            );

            throw error;

        }

    }


    async sendVerificationEmail(
        user,
        token
    ) {

        const frontendUrl =
            process.env.FRONTEND_URL ||
            "http://localhost:5173";


        const verifyUrl =
            `${frontendUrl}/verify-email?token=${encodeURIComponent(token)}`;


        console.log(
            "================================="
        );

        console.log(
            "EMAIL VERIFICATION"
        );

        console.log(
            "USER:",
            user.email
        );

        console.log(
            "FRONTEND_URL:",
            frontendUrl
        );

        console.log(
            "VERIFY URL:",
            verifyUrl
        );

        console.log(
            "================================="
        );


        let html =
            this.loadTemplate(
                "verify-email.html"
            );


        const name =
            user.firstName ||
            user.username ||
            "there";


        html = html

            .replace(
                /{{NAME}}/g,
                name
            )

            .replace(
                /{{VERIFY_URL}}/g,
                verifyUrl
            )

            .replace(
                /{{YEAR}}/g,
                new Date().getFullYear()
            );


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


    async sendResetPasswordEmail(
        user,
        token
    ) {

        const frontendUrl =
            process.env.FRONTEND_URL ||
            "http://localhost:5173";


        const resetUrl =
            `${frontendUrl}/reset-password?token=${encodeURIComponent(token)}`;


        let html =
            this.loadTemplate(
                "reset-password.html"
            );


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
            this.loadTemplate(
                "welcome.html"
            );


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


module.exports =
    new EmailService();