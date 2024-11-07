const db = require('../config/db');

// Get all payments
exports.getAllPayments = (req, res) => {
  db.query('SELECT * FROM Payments', (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results);
  });
};

// Get payment by ID
exports.getPaymentById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Payments WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results[0]);
  });
};

// Create new payment
exports.createPayment = (req, res) => {
  const { amount, createdAt, Bookingid, guestid, paymentmethod } = req.body;
  db.query(
    'INSERT INTO Payments (amount, createdAt, Bookingid, guestid, paymentmethod) VALUES (?, ?, ?, ?, ?)',
    [amount, createdAt, Bookingid, guestid, paymentmethod],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.status(201).json({ id: results.insertId });
    }
  );
};

// Update payment by ID
exports.updatePayment = (req, res) => {
  const { id } = req.params;
  const { amount, createdAt, Bookingid, guestid, paymentmethod } = req.body;
  db.query(
    'UPDATE Payments SET amount = ?, createdAt = ?, Bookingid = ?, guestid = ?, paymentmethod = ? WHERE id = ?',
    [amount, createdAt, Bookingid, guestid, paymentmethod, id],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.json({ message: 'Payment updated successfully' });
    }
  );
};

// Delete payment by ID
exports.deletePayment = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Payments WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json({ message: 'Payment deleted successfully' });
  });
};
