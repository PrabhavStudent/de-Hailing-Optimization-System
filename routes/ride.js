const express = require('express');
const { requestRide, availableDrivers, matchRides } = require('../controllers/rideController');
const router = express.Router();

router.post('/request', requestRide);
router.get('/drivers', availableDrivers);
router.post('/match', matchRides);

module.exports = router;
