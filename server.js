const express = require('express');
const app = express();
const rideRoutes = require('./routes/ride');

app.use(express.json());
app.use('/api/ride', rideRoutes);

app.get('/', (req, res) => {
    res.send('Ride Matching Server is Running!');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
