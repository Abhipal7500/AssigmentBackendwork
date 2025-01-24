const express = require("express");
const calculatePoints = require("../jobs/calculatePoints");
const checkForPrize = require("../jobs/checkForPrize");
const updateUserData = require("../jobs/updateUserData");
const User = require("../models/User");

const router = express.Router();

// Register User or Retrieve Existing User
router.post("/register", async (req, res) => {
  const { email } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email });
    await user.save();
  }

  res.json(user);
});

// Handle Button Click
router.post("/:email/click", async (req, res) => {
  const { email } = req.params;
  const points = calculatePoints();
  const wonPrize = checkForPrize();
  const user = await updateUserData(email, points, wonPrize);

  if (user) {
    res.json({
      totalPoints: user.totalPoints,
      prizesWon: user.prizesWon,
      message: wonPrize ? "You won a prize!" : points === 10 ? "You earned 10 points!" : "",
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Fetch user details by email
router.get("/:email", async (req, res) => {
    const { email } = req.params;
  
    try {
      const user = await User.findOne({ email });
      if (user) {
        res.json({
          totalPoints: user.totalPoints,
          prizesWon: user.prizesWon,
        });
      } else {
        res.status(404).json({ message: "User  not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user data" });
    }
  });
  

module.exports = router;
