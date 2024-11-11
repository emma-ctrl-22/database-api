const { Guest } = require('../models'); // Import the Guest model

// Get all guests
exports.getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.findAll();
    res.json(guests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get guest by ID
exports.getGuestById = async (req, res) => {
  const { id } = req.params;
  try {
    const guest = await Guest.findByPk(id);
    if (!guest) {
      return res.status(404).json({ error: 'Guest not found' });
    }
    res.json(guest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new guest
exports.createGuest = async (req, res) => {
  const { firstname, lastname, gender, email } = req.body;
  try {
    const newGuest = await Guest.create({
      firstname,
      lastname,
      gender,
      email,
    });
    res.status(201).json(newGuest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update guest by ID
exports.updateGuest = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, gender, email } = req.body;
  try {
    const guest = await Guest.findByPk(id);
    if (!guest) {
      return res.status(404).json({ error: 'Guest not found' });
    }
    await guest.update({
      firstname,
      lastname,
      gender,
      email,
    });
    res.json({ message: 'Guest updated successfully', guest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete guest by ID
exports.deleteGuest = async (req, res) => {
  const { id } = req.params;
  try {
    const guest = await Guest.findByPk(id);
    if (!guest) {
      return res.status(404).json({ error: 'Guest not found' });
    }
    await guest.destroy();
    res.json({ message: 'Guest deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
