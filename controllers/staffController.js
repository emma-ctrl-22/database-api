const db = require('../config/db');

// Get all staff
exports.getAllStaff = (req, res) => {
  db.query('SELECT * FROM Staff', (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results);
  });
};

// Get staff by ID
exports.getStaffById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Staff WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results[0]);
  });
};

// Create new staff
exports.createStaff = (req, res) => {
  const { name, gender, position, email } = req.body;
  db.query(
    'INSERT INTO Staff (name, gender, position, email) VALUES (?, ?, ?, ?)',
    [name, gender, position, email],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.status(201).json({ id: results.insertId });
    }
  );
};

// Update staff by ID
exports.updateStaff = (req, res) => {
  const { id } = req.params;
  const { name, gender, position, email } = req.body;
  db.query(
    'UPDATE Staff SET name = ?, gender = ?, position = ?, email = ? WHERE id = ?',
    [name, gender, position, email, id],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.json({ message: 'Staff updated successfully' });
    }
  );
};

// Delete staff by ID
exports.deleteStaff = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Staff WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json({ message: 'Staff deleted successfully' });
  });
};
