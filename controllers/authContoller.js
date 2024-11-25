const { Staff } = require('../models');
const bcrypt = require('bcrypt');

// Login staff
exports.loginStaff = async (req, res) => {
    const { email, password } = req.body;
    try {
        const staff = await Staff.findOne({ where: { email } });
        if (!staff) {
            return res.status(404).json({ error: 'Staff not found' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, staff.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Optionally, return a token or staff information
        res.json({ message: 'Login successful', staff });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
