const calculatePoints = () => {
    return Math.random() < 0.5 ? 10 : 1; // 50% chance of 10 points
  };
  
  module.exports = calculatePoints;
  