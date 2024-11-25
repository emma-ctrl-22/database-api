const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const authController = require('../controllers/authContoller');
// Define routes for Staff CRUD operations
router.get('/', staffController.getAllStaff);
router.get('/:id', staffController.getStaffById);
router.post('/', staffController.createStaff);
router.put('/:id', staffController.updateStaff);
router.delete('/:id', staffController.deleteStaff);
router.post('/login',authController.loginStaff)

module.exports = router;
