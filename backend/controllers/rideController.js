// backend/controllers/rideController.js

const optimalRideAssignment = (req, res) => {
    const users = req.body.users;    // Users will be an array: [{lat, lng}]
    const drivers = req.body.drivers; // Drivers will be an array: [{lat, lng}]
    
    const n = users.length;
    const m = drivers.length;
  
    if (n > m) {
      return res.status(400).json({ message: "More users than drivers. Cannot assign." });
    }
  
    // Precompute distance (cost) between each user and driver
    const cost = Array.from({ length: n }, () => Array(m).fill(0));
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const dx = users[i].lat - drivers[j].lat;
        const dy = users[i].lng - drivers[j].lng;
        cost[i][j] = Math.sqrt(dx * dx + dy * dy); // Euclidean distance
      }
    }
  
    const size = 1 << m;  // Total subsets of drivers
    const dp = Array(size).fill(Infinity);
    dp[0] = 0;
  
    for (let mask = 0; mask < size; mask++) {
      const assignedUsers = countBits(mask);
      if (assignedUsers >= n) continue;
  
      for (let j = 0; j < m; j++) {
        if ((mask & (1 << j)) === 0) {  // If driver j not assigned
          const newMask = mask | (1 << j);
          dp[newMask] = Math.min(dp[newMask], dp[mask] + cost[assignedUsers][j]);
        }
      }
    }
  
    const minCost = Math.min(...dp.slice((1 << n) - 1));  // Minimum cost after all users assigned
  
    res.status(200).json({ minCost });
  };
  
  // Helper to count bits (how many users assigned)
  function countBits(mask) {
    let count = 0;
    while (mask > 0) {
      count += mask & 1;
      mask >>= 1;
    }
    return count;
  }
  
  module.exports = { optimalRideAssignment };
  