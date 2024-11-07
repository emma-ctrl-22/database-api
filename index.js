const express = require('express');
const app = express();
require('dotenv').config();

const guestRoutes = require('./routes/guestRoutes');
const staffRoutes = require('./routes/staffRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const serviceRecordRoutes = require('./routes/serviceRecordRoutes');

// Middleware
app.use(express.json());

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
