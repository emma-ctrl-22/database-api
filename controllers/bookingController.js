const { Booking } = require('../models'); // Import the Booking model

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create new booking
exports.createBooking = async (req, res) => {
  const { guestid, staffid, roomid, checkout_date, checkin_date, paymentid, status } = req.body;
  try {
    const newBooking = await Booking.create({
      guestid,
      staffid,
      roomid,
      checkout_date,
      checkin_date,
      paymentid,
      status,
    });
    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update booking by ID
exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const { guestid, staffid, roomid, checkout_date, checkin_date, paymentid, status } = req.body;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    await booking.update({
      guestid,
      staffid,
      roomid,
      checkout_date,
      checkin_date,
      paymentid,
      status,
    });
    res.json({ message: 'Booking updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete booking by ID
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    await booking.destroy();
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
