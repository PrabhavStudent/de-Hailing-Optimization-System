import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [userLocation, setUserLocation] = useState("");
  const [driverLocation, setDriverLocation] = useState("");
  const [rideAssignment, setRideAssignment] = useState(null);

  const handleSubmit = async () => {
    try {
      // Change this URL to your backend's URL (with the correct codespace public URL)
      const response = await axios.post('https://<your-codespace-name>-5000.app.github.dev/api/ride/optimal-assignment', {
        userLocation,
        driverLocation
      });
      setRideAssignment(response.data);
    } catch (error) {
      console.error('Error connecting to backend:', error);
    }
  };

  return (
    <div>
      <h1>Ride Matching</h1>
      <div>
        <label>User Location: </label>
        <input 
          type="text" 
          value={userLocation} 
          onChange={(e) => setUserLocation(e.target.value)} 
        />
      </div>
      <div>
        <label>Driver Location: </label>
        <input 
          type="text" 
          value={driverLocation} 
          onChange={(e) => setDriverLocation(e.target.value)} 
        />
      </div>
      <button onClick={handleSubmit}>Find Optimal Ride</button>

      {rideAssignment && (
        <div>
          <h2>Optimal Ride Assignment:</h2>
          <pre>{JSON.stringify(rideAssignment, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
