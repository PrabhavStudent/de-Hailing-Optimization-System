// backend/routes/ride.js

const express = require('express');
const { optimalRideAssignment } = require('../rideController');

const router = express.Router();

router.post('/optimal-assignment', optimalRideAssignment);

module.exports = router;
