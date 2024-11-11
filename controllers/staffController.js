const { Staff } = require('../models'); // Import the Staff model

// Get all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.findAll();
    res.json(staffList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get staff by ID
exports.getStaffById = async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await Staff.findByPk(id);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create new staff
exports.createStaff = async (req, res) => {
  const { name, gender, position, email } = req.body;
  try {
    const newStaff = await Staff.create({ name, gender, position, email });
    res.status(201).json(newStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update staff by ID
exports.updateStaff = async (req, res) => {
  const { id } = req.params;
  const { name, gender, position, email } = req.body;
  try {
    const staff = await Staff.findByPk(id);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    await staff.update({ name, gender, position, email });
    res.json({ message: 'Staff updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete staff by ID
exports.deleteStaff = async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await Staff.findByPk(id);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    await staff.destroy();
    res.json({ message: 'Staff deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
