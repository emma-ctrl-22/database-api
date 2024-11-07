const db = require('../config/db');

// Get all services
exports.getAllServices = (req, res) => {
  db.query('SELECT * FROM Service', (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results);
  });
};

// Get service by ID
exports.getServiceById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Service WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results[0]);
  });
};

// Create new service
exports.createService = (req, res) => {
  const { ServiceName, staffId, price } = req.body;
  db.query(
    'INSERT INTO Service (ServiceName, staffId, price) VALUES (?, ?, ?)',
    [ServiceName, staffId, price],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.status(201).json({ id: results.insertId });
    }
  );
};

// Update service by ID
exports.updateService = (req, res) => {
  const { id } = req.params;
  const { ServiceName, staffId, price } = req.body;
  db.query(
    'UPDATE Service SET ServiceName = ?, staffId = ?, price = ? WHERE id = ?',
    [ServiceName, staffId, price, id],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.json({ message: 'Service updated successfully' });
    }
  );
};

// Delete service by ID
exports.deleteService = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Service WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json({ message: 'Service deleted successfully' });
  });
};
