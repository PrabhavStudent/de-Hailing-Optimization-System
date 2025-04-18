const { matchUsersToDrivers } = require('../utils/matching');

// Mock databases (in-memory)
let users = [];
let drivers = [];

// Request a new ride
const requestRide = (req, res) => {
    const { id, location } = req.body;
    users.push({ id, location });
    res.status(200).json({ message: 'Ride requested', user: { id, location } });
};

// Get available drivers
const availableDrivers = (req, res) => {
    res.status(200).json({ drivers });
};

// Match rides (with pooling logic)
const matchRides = (req, res) => {
    const matches = matchUsersToDrivers(users, drivers);
    res.status(200).json({ matches });
};

// Add a few sample drivers for testing
drivers.push({ id: 'D1', location: { lat: 28.61, lng: 77.20 } });
drivers.push({ id: 'D2', location: { lat: 28.62, lng: 77.21 } });
drivers.push({ id: 'D3', location: { lat: 28.63, lng: 77.18 } });

module.exports = { requestRide, availableDrivers, matchRides };
