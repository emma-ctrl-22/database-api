const express = require('express');
const router = express.Router();
const serviceRecordController = require('../controllers/serviceRecordController');

router.get('/', serviceRecordController.getAllServiceRecords);
router.get('/:id', serviceRecordController.getServiceRecordById);
router.post('/', serviceRecordController.createServiceRecord);
router.put('/:id', serviceRecordController.updateServiceRecord);
router.delete('/:id', serviceRecordController.deleteServiceRecord);

module.exports = router;
