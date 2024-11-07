const db = require('../config/db');

// Get all service records
exports.getAllServiceRecords = (req, res) => {
  db.query('SELECT * FROM ServiceRecords', (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results);
  });
};

// Get service record by ID
exports.getServiceRecordById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM ServiceRecords WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results[0]);
  });
};

// Create new service record
exports.createServiceRecord = (req, res) => {
  const { guestid, staffid, amountpaid, date, paymentid, status } = req.body;
  db.query(
    'INSERT INTO ServiceRecords (guestid, staffid, amountpaid, date, paymentid, status) VALUES (?, ?, ?, ?, ?, ?)',
    [guestid, staffid, amountpaid, date, paymentid, status],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.status(201).json({ id: results.insertId });
    }
  );
};

// Update service record by ID
exports.updateServiceRecord = (req, res) => {
  const { id } = req.params;
  const { guestid, staffid, amountpaid, date, paymentid, status } = req.body;
  db.query(
    'UPDATE ServiceRecords SET guestid = ?, staffid = ?, amountpaid = ?, date = ?, paymentid = ?, status = ? WHERE id = ?',
    [guestid, staffid, amountpaid, date, paymentid, status, id],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.json({ message: 'Service record updated successfully' });
    }
  );
};

// Delete service record by ID
exports.deleteServiceRecord = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM ServiceRecords WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json({ message: 'Service record deleted successfully' });
  });
};
