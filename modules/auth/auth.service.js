const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const walletService = require("../wallet/wallet.service");
const subscriptionService = require("../subscription/subscription.service");
const Profile = require("../profile/profile.model");
const tokenService = require("./token.service");
const crypto = require("crypto");
const plans = require("../../config/plans.config");
const EmailVerification = require("./emailVerification.model");
const {
sendNotification
}
=
require("../notification/notification.helper");
const PasswordReset = require("./passwordReset.model");

const emailService = require("./email.service");

const User = require("../user/user.model");

const referralService =
    require("../referral/referral.service");

// FIX PATH (most likely correct)
const RefreshToken = require("../auth/refreshToken.model");

// FIX: either create or remove events
const { emitUserRegistered, emitUserLoggedIn } = require("../auth/auth.events");


class AuthService {

    async getMe(userId) {
  const user = await User.findById(userId)
    .select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
    
 async register(data) {
console.log("REGISTER DATA:");
console.log(data);
console.log("ROLE:", data.role);
console.log("PLAN:", data.plan);
    const existingUser = await User.findOne({
        email: data.email
    });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    // =====================================================
// OPTIONAL REFERRAL
// =====================================================

let referrer = null;

const suppliedReferralCode =
    data.referralCode
        ?.trim()
        .toUpperCase() || null;

if (suppliedReferralCode) {

    referrer = await User.findOne({
        referralCode: suppliedReferralCode
    });

    if (!referrer) {
        throw new Error(
            "Invalid referral number"
        );
    }

    console.log(
        "✅ REFERRER FOUND:",
        referrer.username,
        referrer.referralCode
    );
}



    const user = await User.create({

    firstName:data.firstName,

    lastName:data.lastName,

    displayName:data.displayName,

    username:data.username,

    email:data.email.toLowerCase(),

    phone:data.phone,

    country:data.country,

    province:data.province,

    city:data.city,

    dateOfBirth:data.dateOfBirth,

    gender:data.gender,

    password:passwordHash,

    role:data.role,

    subscriptionPlan:data.plan,

    emailVerified:false,
    verified:false,

    status:"active",

    acceptTerms:data.acceptTerms,

    acceptPrivacy:data.acceptPrivacy,

    marketingConsent:data.marketingConsent,

   referredBy: referrer
        ? referrer._id
        : null,

    referralRewarded: false

});

await Profile.create({
    user: user._id,
    displayName: user.username
});

await walletService.createWallet(user._id);

const ownReferralCode =
    await referralService.createUserReferralCode(
        user._id
    );
const updatedUser = await User.findById(user._id);
console.log(
    "✅ USER REFERRAL NUMBER:",
    ownReferralCode
);


let referralRecord = null;

if (suppliedReferralCode) {

    console.log(
        "🎁 CREATING REFERRAL RECORD"
    );

    referralRecord =
        await referralService.complete(
            suppliedReferralCode,
            user._id
        );

    console.log(
        "✅ REFERRAL RECORD CREATED:",
        referralRecord
    );
}

// Get selected plan
const selectedPlan =
    plans[data.plan] || plans.FREE_MEMBER;

// Invalid plan
if (!selectedPlan) {
    throw new Error("Invalid subscription plan");
}

// Paid plan
if (selectedPlan.price > 0) {

    await subscriptionService.create(
        user._id,
        data.plan,
        "pending_payment"
    );

    return {
        user,
        paymentRequired: true,
        amount: selectedPlan.price,
        plan: data.plan
    };
}

// Free plan
await subscriptionService.create(
    user._id,
    data.plan,
    "active"
);

   if (data.role === "member") {
    // only MEMBER plans
}

if (data.role === "creator") {
    // only CREATOR plans
}

if (data.role === "business") {
    // only BUSINESS plans
}

await sendNotification({

recipient:user._id,

type:"WELCOME",

title:"Welcome to BLYNK",

message:
"Your account has been created successfully",

entityType:"USER",

entityId:user._id

});

    emitUserRegistered({
        userId: user._id
    });

   const requireVerification =
    process.env.REQUIRE_EMAIL_VERIFICATION === "true";

if (requireVerification && !user.emailVerified) {

    console.log("EMAIL VERIFICATION REQUIRED");

    const token =
        await tokenService.createEmailVerificationToken(
            user._id
        );

    console.log("TOKEN CREATED:", token);

    await emailService.sendVerificationEmail(
        user,
        token
    );

    console.log("EMAIL SENT");

    return {
success: true,
    message: "Please verify your email. A new verification email has been sent.",
    referralCode: updatedUser.referralCode,
     user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        role: user.role,
        subscriptionPlan: user.subscriptionPlan,
        referralCode: user.referralCode
    }
        
    };
}
 }

  async login(email, password) {
    console.log("LOGIN EMAIL:", email);
    const user = await User.findOne({ email });
console.log("USER FOUND:", user);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      console.log("HASH:", user.password);
      console.log("PASSWORD PROVIDED:", password);
console.log("PASSWORD MATCH:", valid);
      throw new Error("Invalid credentials");
    }
console.log("================================");
console.log("ENV VALUE:", process.env.REQUIRE_EMAIL_VERIFICATION);
console.log(
  "requireVerification:",
  process.env.REQUIRE_EMAIL_VERIFICATION === "true"
);
console.log("user.emailVerified:", user.emailVerified);
console.log("================================");


  

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    emitUserLoggedIn({ userId: user._id });

    return {
      user,
      accessToken,
      refreshToken
    };
  }


async verifyEmail(token) {

    console.log("");
    console.log("========================================");
    console.log("🔐 VERIFY EMAIL DEBUG");
    console.log("TOKEN RECEIVED:", token);
    console.log("TOKEN LENGTH:", token?.length);
    console.log("========================================");

    const record = await EmailVerification.findOne({
        token: token
    });

    console.log("VERIFICATION RECORD:", record);

    if (!record) {

        console.log("❌ TOKEN NOT FOUND IN MONGODB");

        return {
            success: false,
            message: "Invalid verification link."
        };
    }

    console.log("✅ TOKEN FOUND");
    console.log("USER ID:", record.userId);
    console.log("EXPIRES:", record.expiresAt);
    console.log("NOW:", new Date());

    if (record.expiresAt < new Date()) {

        console.log("❌ TOKEN EXPIRED");

        await EmailVerification.deleteOne({
            _id: record._id
        });

        return {
            success: false,
            message: "Verification link expired."
        };
    }

    const user = await User.findById(record.userId);

    console.log("USER FOUND:", !!user);

    if (!user) {

        console.log("❌ USER NOT FOUND");

        return {
            success: false,
            message: "User not found."
        };
    }

    user.emailVerified = true;
    user.verified = true;

    await user.save();
// ==========================================
// REFERRAL REWARD
// ==========================================

try {

    const referralService =
        require("../referral/referral.service");

    const referralResult =
        await referralService.rewardReferral(
            user._id
        );

    console.log(
        "🎁 REFERRAL RESULT:",
        referralResult
    );

} catch (referralError) {

    console.error(
        "❌ REFERRAL REWARD ERROR:",
        referralError
    );

}
    await EmailVerification.deleteOne({
        _id: record._id
    });

    console.log("✅ EMAIL VERIFIED SUCCESSFULLY");

    return {
        success: true,
        message: "Email verified successfully."
    };
    
}


async resendVerification(email) {

    const user =
        await User.findOne({
            email: email.toLowerCase()
        });

    if (!user)
        throw new Error("User not found.");

    if (user.emailVerified) {

        return {

            success: true,

            message:
                "Email already verified."

        };

    }

    await EmailVerification.deleteMany({

        userId: user._id

    });

    const token =
        crypto.randomBytes(32).toString("hex");

    await EmailVerification.create({

        userId: user._id,

        token,

        expiresAt:
            new Date(
                Date.now() +
                24 * 60 * 60 * 1000
            )

    });

    await emailService.sendVerificationEmail(
        user,
        token
    );

    return {

        success: true,

        message:
            "Verification email sent."

    };

}

async forgotPassword(email) {

    const user =
        await User.findOne({
            email: email.toLowerCase()
        });

    if (!user)
        return {

            success: true,

            message:
                "If the email exists, a reset email has been sent."

        };

    await PasswordReset.deleteMany({

        userId: user._id

    });

    const token =
        crypto.randomBytes(32).toString("hex");

    await PasswordReset.create({

        userId: user._id,

        token,

        expiresAt:
            new Date(
                Date.now() +
                60 * 60 * 1000
            )

    });

    await emailService.sendResetPasswordEmail(
        user,
        token
    );

    return {

        success: true,

        message:
            "Password reset email sent."

    };

}

async resetPassword(token, password) {

    const record =
        await PasswordReset.findOne({
            token
        });

    if (!record)
        throw new Error(
            "Invalid reset token."
        );

    if (record.expiresAt < new Date()) {

        await PasswordReset.deleteOne({
            _id: record._id
        });

        throw new Error(
            "Reset token expired."
        );

    }

    const user =
        await User.findById(record.userId);

    if (!user)
        throw new Error(
            "User not found."
        );

    user.password =
        await bcrypt.hash(password, 10);

    await user.save();

    await PasswordReset.deleteOne({

        _id: record._id

    });

    return {

        success: true,

        message:
            "Password changed successfully."

    };

}

}

module.exports = new AuthService();