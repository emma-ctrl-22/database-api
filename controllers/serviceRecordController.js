const { ServiceRecord } = require('../models'); // Import the ServiceRecord model

// Get all service records
exports.getAllServiceRecords = async (req, res) => {
  try {
    const serviceRecords = await ServiceRecord.findAll();
    res.json(serviceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get service record by ID
exports.getServiceRecordById = async (req, res) => {
  const { id } = req.params;
  try {
    const serviceRecord = await ServiceRecord.findByPk(id);
    if (!serviceRecord) {
      return res.status(404).json({ error: 'Service record not found' });
    }
    res.json(serviceRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create new service record
exports.createServiceRecord = async (req, res) => {
  const { guestId, staffId, amountPaid, paymentId, status } = req.body;
  console.log(req.body);
  try {
    const newServiceRecord = await ServiceRecord.create({
      guestId,
      staffId,
      amountPaid,
    
      paymentId,
      status,
    });
    res.status(201).json(newServiceRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update service record by ID
exports.updateServiceRecord = async (req, res) => {
  const { id } = req.params;
  const { guestId, staffId, amountPaid, date, paymentId, status } = req.body;
  try {
    const serviceRecord = await ServiceRecord.findByPk(id);
    if (!serviceRecord) {
      return res.status(404).json({ error: 'Service record not found' });
    }
    await serviceRecord.update({
      guestId,
      staffId,
      amountPaid,
      date,
      paymentId,
      status,
    });
    res.json({ message: 'Service record updated successfully', serviceRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete service record by ID
exports.deleteServiceRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const serviceRecord = await ServiceRecord.findByPk(id);
    if (!serviceRecord) {
      return res.status(404).json({ error: 'Service record not found' });
    }
    await serviceRecord.destroy();
    res.json({ message: 'Service record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
