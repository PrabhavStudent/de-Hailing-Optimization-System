// Calculate simple distance between two points
function distance(loc1, loc2) {
    const dx = loc1.lat - loc2.lat;
    const dy = loc1.lng - loc2.lng;
    return Math.sqrt(dx * dx + dy * dy);
}

// Match users to drivers
function matchUsersToDrivers(users, drivers) {
    let matches = [];
    let usedDrivers = new Set();
    
    users.forEach(user => {
        // Find nearest driver
        let minDist = Infinity;
        let selectedDriver = null;
        
        drivers.forEach(driver => {
            if (usedDrivers.has(driver.id)) return;
            const dist = distance(user.location, driver.location);
            if (dist < minDist) {
                minDist = dist;
                selectedDriver = driver;
            }
        });
        
        if (selectedDriver) {
            matches.push({ user: user.id, driver: selectedDriver.id, distance: minDist.toFixed(2) });
            usedDrivers.add(selectedDriver.id);
        }
    });
    
    return matches;
}

module.exports = { matchUsersToDrivers };
