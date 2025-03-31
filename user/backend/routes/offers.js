const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// Get all available app install offers
router.get("/", async (req, res) => {
  try {
    // In a real implementation, you would fetch this from Firestore
    // For demo purposes, we'll return dummy data
    const offers = [
      {
        id: "offer1",
        title: "Game App",
        description: "Install and play to level 5",
        category: "game",
        coins: 100,
        imageUrl: "https://via.placeholder.com/100",
        appSize: "45MB",
        requirements: "Install and reach level 5",
        downloadUrl: "https://play.google.com/store",
        createdAt: new Date().toISOString(),
      },
      {
        id: "offer2",
        title: "Shopping App",
        description: "Install and create an account",
        category: "shopping",
        coins: 50,
        imageUrl: "https://via.placeholder.com/100",
        appSize: "25MB",
        requirements: "Install and sign up",
        downloadUrl: "https://play.google.com/store",
        createdAt: new Date().toISOString(),
      },
      {
        id: "offer3",
        title: "Utility App",
        description: "Install and use for 5 minutes",
        category: "utility",
        coins: 75,
        imageUrl: "https://via.placeholder.com/100",
        appSize: "15MB",
        requirements: "Install and use features",
        downloadUrl: "https://play.google.com/store",
        createdAt: new Date().toISOString(),
      },
    ];

    res.status(200).json(offers);
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a specific offer
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // In a real implementation, you would fetch this from Firestore
    // For demo purposes, we'll return dummy data
    const offer = {
      id,
      title: "Game App",
      description: "Install and play to level 5",
      category: "game",
      coins: 100,
      imageUrl: "https://via.placeholder.com/100",
      appSize: "45MB",
      requirements: "Install and reach level 5",
      instructions: [
        "Click the Install button below",
        "Open the app after installation",
        "Create an account and complete tutorial",
        "Play until you reach level 5",
        "Return to Frizza to claim your reward",
      ],
      downloadUrl: "https://play.google.com/store",
      createdAt: new Date().toISOString(),
    };

    res.status(200).json(offer);
  } catch (error) {
    console.error("Error fetching offer:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Track offer click
router.post("/:id/click", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // In a real implementation, you would track this in Firestore
    // For demo purposes, we'll just return success
    res.status(200).json({
      success: true,
      message: "Offer click tracked",
      trackingId: "track-" + Math.random().toString(36).substring(2, 9),
    });
  } catch (error) {
    console.error("Error tracking offer click:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Verify offer completion
router.post("/:id/verify", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, trackingId } = req.body;

    if (!userId || !trackingId) {
      return res
        .status(400)
        .json({ error: "User ID and tracking ID are required" });
    }

    // In a real implementation, you would verify if the user completed the task
    // For demo purposes, we'll just return success
    res.status(200).json({
      success: true,
      message: "Offer verified and coins credited",
      coinsEarned: 100,
    });
  } catch (error) {
    console.error("Error verifying offer:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
