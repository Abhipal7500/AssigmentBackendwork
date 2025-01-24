const User = require("../models/User");

const updateUserData = async (email, points, wonPrize) => {
  const user = await User.findOne({ email });

  if (user) {
    user.totalPoints += points;
    if (wonPrize) user.prizesWon += 1;
    await user.save();
    return user;
  }

  return null;
};

module.exports = updateUserData;
