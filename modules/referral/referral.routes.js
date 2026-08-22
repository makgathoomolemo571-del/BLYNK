const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const controller = require("./referral.controller");

const express = require("express");



const referralService =
  require("./referral.service");




// =====================================================
// GET MY REFERRAL NUMBER
// =====================================================

router.get(
  "/me",
  authMiddleware,
  async (req, res) => {

    try {

      const userId =
        req.user.userId ||
        req.user.id ||
        req.user._id;

      const User =
        require("../user/user.model");

      const user =
        await User.findById(userId)
          .select("referralCode");

      if (!user) {

        return res.status(404).json({
          message: "User not found"
        });

      }

      return res.json({

        referralCode:
          user.referralCode || null

      });

    } catch (error) {

      console.error(
        "GET REFERRAL ERROR:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to fetch referral number"
      });

    }

  }
);


// =====================================================
// GENERATE MY REFERRAL NUMBER
// =====================================================

router.post(
  "/generate",
  authMiddleware,
  async (req, res) => {

    try {

      const userId =
        req.user.userId ||
        req.user.id ||
        req.user._id;

      const referralCode =
        await referralService.createUserReferralCode(
          userId
        );

      return res.json({

        success: true,

        referralCode

      });

    } catch (error) {

      console.error(
        "GENERATE REFERRAL ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Failed to generate referral number"

      });

    }

  }
);




// Complete a referral during registration
router.post("/complete", auth, controller.complete);

// Reward referral
router.post("/:id/reward", auth, controller.reward);

// Referral history
router.get("/mine", auth, controller.mine);

// Referral stats
router.get("/stats", auth, controller.stats);

module.exports = router;