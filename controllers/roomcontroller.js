const db = require('../config/db');

// Get all rooms
exports.getAllRooms = (req, res) => {
  db.query('SELECT * FROM Room', (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results);
  });
};

// Get room by ID
exports.getRoomById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Room WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results[0]);
  });
};

// Create new room
exports.createRoom = (req, res) => {
  const { type, description, status } = req.body;
  db.query(
    'INSERT INTO Room (type, description, status) VALUES (?, ?, ?)',
    [type, description, status],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.status(201).json({ id: results.insertId });
    }
  );
};

// Update room by ID
exports.updateRoom = (req, res) => {
  const { id } = req.params;
  const { type, description, status } = req.body;
  db.query(
    'UPDATE Room SET type = ?, description = ?, status = ? WHERE id = ?',
    [type, description, status, id],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.json({ message: 'Room updated successfully' });
    }
  );
};

// Delete room by ID
exports.deleteRoom = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Room WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json({ message: 'Room deleted successfully' });
  });
};
