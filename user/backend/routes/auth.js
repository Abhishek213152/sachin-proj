const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// Verify Phone Number and send OTP
router.post("/verify-phone", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    // In a real implementation, you would use Firebase Admin SDK to send verification SMS
    // This is a placeholder for demonstration
    res
      .status(200)
      .json({
        message: "Verification code sent",
        sessionInfo: "dummy-session-info",
      });
  } catch (error) {
    console.error("Error verifying phone:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Verify OTP and create/sign in user
router.post("/verify-otp", async (req, res) => {
  try {
    const { sessionInfo, code } = req.body;

    if (!sessionInfo || !code) {
      return res
        .status(400)
        .json({ error: "Session info and code are required" });
    }

    // In a real implementation, you would verify the OTP with Firebase Admin SDK
    // For demo purposes, we'll just create a dummy user
    const uid = "user-" + Math.random().toString(36).substring(2, 9);
    const userRecord = {
      uid,
      phoneNumber: "+919876543210", // This would normally come from the verified phone number
      displayName: "New User",
      coins: 500,
    };

    // Create a custom token for client authentication
    const token = await admin.auth().createCustomToken(uid);

    res.status(200).json({
      message: "Phone number verified successfully",
      user: userRecord,
      token,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get current user profile
router.get("/profile", async (req, res) => {
  try {
    // Authorization header should contain: Bearer <token>
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify the token with Firebase Admin SDK
    // In a real implementation, you would validate the token
    // For demo purposes, we'll just return a dummy user profile
    res.status(200).json({
      uid: "user123",
      phoneNumber: "+919876543210",
      displayName: "Demo User",
      coins: 500,
      totalEarnings: 200,
      pendingPayouts: 0,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
