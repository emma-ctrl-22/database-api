const db = require('../config/db');

exports.getAllGuests = (req, res) => {
  db.query('SELECT * FROM Guest', (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results);
  });
};

exports.getGuestById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Guest WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results[0]);
  });
};

exports.createGuest = (req, res) => {
  const { firstname, lastname, gender, email } = req.body;
  db.query(
    'INSERT INTO Guest (firstname, lastname, gender, email) VALUES (?, ?, ?, ?)',
    [firstname, lastname, gender, email],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.status(201).json({ id: results.insertId });
    }
  );
};

exports.updateGuest = (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, gender, email } = req.body;
  db.query(
    'UPDATE Guest SET firstname = ?, lastname = ?, gender = ?, email = ? WHERE id = ?',
    [firstname, lastname, gender, email, id],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.json({ message: 'Guest updated successfully' });
    }
  );
};

exports.deleteGuest = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Guest WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json({ message: 'Guest deleted successfully' });
  });
};
