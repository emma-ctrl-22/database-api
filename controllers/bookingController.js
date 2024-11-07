const db = require('../config/db');

// Get all bookings
exports.getAllBookings = (req, res) => {
  db.query('SELECT * FROM Bookings', (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results);
  });
};

// Get booking by ID
exports.getBookingById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Bookings WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results[0]);
  });
};

// Create new booking
exports.createBooking = (req, res) => {
  const { guestid, staffid, roomid, checkout_date, checkin_date, paymentid, status } = req.body;
  db.query(
    'INSERT INTO Bookings (guestid, staffid, roomid, checkout_date, checkin_date, paymentid, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [guestid, staffid, roomid, checkout_date, checkin_date, paymentid, status],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.status(201).json({ id: results.insertId });
    }
  );
};

// Update booking by ID
exports.updateBooking = (req, res) => {
  const { id } = req.params;
  const { guestid, staffid, roomid, checkout_date, checkin_date, paymentid, status } = req.body;
  db.query(
    'UPDATE Bookings SET guestid = ?, staffid = ?, roomid = ?, checkout_date = ?, checkin_date = ?, paymentid = ?, status = ? WHERE id = ?',
    [guestid, staffid, roomid, checkout_date, checkin_date, paymentid, status, id],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.json({ message: 'Booking updated successfully' });
    }
  );
};

// Delete booking by ID
exports.deleteBooking = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Bookings WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json({ message: 'Booking deleted successfully' });
  });
};
