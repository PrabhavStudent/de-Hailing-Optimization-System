// backend/routes/ride.js

const express = require('express');
const { optimalRideAssignment } = require('../controllers/rideController');

const router = express.Router();

router.post('/optimal-assignment', optimalRideAssignment);

module.exports = router;
