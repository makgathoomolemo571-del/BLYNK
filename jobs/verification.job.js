const User = require("../modules/user/user.model");
const Verification = require("../modules/verification/verification.model");

async function runVerificationJob() {

  try {

    const pending = await Verification.find({
      status: "pending"
    });

    for (let v of pending) {

      const user = await User.findById(v.user);

      if (!user) continue;

      const ageDays =
        (Date.now() - new Date(v.createdAt)) /
        (1000 * 60 * 60 * 24);

      // auto-expire after 7 days
      if (ageDays > 7) {

        v.status = "expired";
        await v.save();

        console.log("VERIFICATION_EXPIRED", v._id);
      }
    }

    console.log("VERIFICATION_JOB_DONE");

  } catch (err) {
    console.error("VERIFICATION_JOB_ERROR:", err);
  }
}

module.exports = runVerificationJob;