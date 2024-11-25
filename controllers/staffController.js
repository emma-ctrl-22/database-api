const { Staff } = require('../models'); // Import the Staff model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Generate a new StaffId
const generateStaffId = async () => {
  const count = await Staff.count();
  const newId = `HSTAFF${String(count + 1).padStart(3, '0')}`;
  return newId;
};

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
  console.log('Request body:', req.body);
  const { name, gender, position, email, role, password } = req.body;
  try {
    const newStaffId = await generateStaffId();

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStaff = await Staff.create({
      name,
      gender,
      position,
      email,
      role,
      StaffId: newStaffId,
      password: hashedPassword
    });

    res.status(201).json(newStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update staff by ID
exports.updateStaff = async (req, res) => {
  const { id } = req.params;
  const { name, gender, position, email, role, password } = req.body;
  try {
    const staff = await Staff.findByPk(id);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }

    // Hash the new password if provided
    const updatedData = { name, gender, position, email, role };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    await staff.update(updatedData);
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
