const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const db = require('./models'); // Import the models

// Test the database connection
db.sequelize.authenticate()
  .then(() => console.log('Database connection established'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Middleware
app.use(cors()); // Use CORS middleware

app.use(express.json());

// Import routes
const guestRoutes = require('./routes/guestRoutes');
const staffRoutes = require('./routes/staffRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const serviceRecordRoutes = require('./routes/serviceRecordRoutes');

// Routes
app.use('/api/guests', guestRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/service-records', serviceRecordRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
