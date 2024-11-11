const { Payment } = require('../models'); // Import the Payment model

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new payment
exports.createPayment = async (req, res) => {
  const { amount, createdAt, Bookingid, guestid, paymentmethod } = req.body;
  try {
    const newPayment = await Payment.create({
      amount,
      createdAt,
      Bookingid,
      guestid,
      paymentmethod,
    });
    res.status(201).json(newPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update payment by ID
exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  const { amount, createdAt, Bookingid, guestid, paymentmethod } = req.body;
  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    await payment.update({
      amount,
      createdAt,
      Bookingid,
      guestid,
      paymentmethod,
    });
    res.json({ message: 'Payment updated successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete payment by ID
exports.deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    await payment.destroy();
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
