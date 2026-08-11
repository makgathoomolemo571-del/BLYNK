const authService =
  require("../auth/auth.service");
  const Rules = require("../../rules");

const {
  registerValidator,
  loginValidator
} = require("../auth/auth.validator");

const {
  mapAuthResponse
} = require("../auth/auth.mapper");

const {
  toUserDTO
} = require("../user/user.mapper");

exports.register = async (req, res, next) => {
    
    try {

        await Rules.Auth.validateRegister(req.body);

        console.log("REGISTER BODY:");
console.log(req.body);


        const result = await authService.register(req.body);

        res.status(201).json({
    success: true,
    message: result.message,
    user: result.user,
    paymentRequired: result.paymentRequired,
    amount: result.amount,
    plan: result.plan
});

    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
console.log("LOGIN 1");
    try {
console.log("LOGIN 2");
        await Rules.Auth.validateLogin(req.body);

        const result = await authService.login(
            req.body.email,
            req.body.password
        );

        console.log("LOGIN 3");

        res.json(result);

        console.log("LOGIN 4");

    } catch (err) {
        console.log("LOGIN ERROR", err);
        next(err);
    }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.userId);

    res.json(user);
  } catch (err) {
    next(err);
  }
};


// GET — does NOT verify
exports.openVerificationPage = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.redirect(
            `${process.env.FRONTEND_URL}/verify-email?error=missing-token`
        );
    }

    return res.redirect(
        `${process.env.FRONTEND_URL}/verify-email?token=${encodeURIComponent(token)}`
    );
};


// POST — DOES verify
exports.verifyEmail = async (req, res, next) => {
    try {
        const token = req.body.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Verification token is required."
            });
        }

        const result = await authService.verifyEmail(token);

        return res.status(200).json(result);

    } catch (err) {
        console.error("EMAIL VERIFICATION ERROR:", err);

        return res.status(400).json({
            success: false,
            message: err.message || "Email verification failed."
        });
    }
};




exports.resendVerification = async (req, res, next) => {

    try {

        const result =
            await authService.resendVerification(
                req.body.email
            );

        res.json(result);

    } catch (err) {

        next(err);

    }

};

exports.forgotPassword = async (req, res, next) => {

    try {

        const result =
            await authService.forgotPassword(
                req.body.email
            );

        res.json(result);

    } catch (err) {

        next(err);

    }

};

exports.resetPassword = async (req, res, next) => {

    try {

        const result =
            await authService.resetPassword({

                token: req.body.token,

                password: req.body.password

            });

        res.json(result);

    } catch (err) {

        next(err);

    }

};