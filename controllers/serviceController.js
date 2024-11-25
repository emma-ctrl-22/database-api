const { Service } = require('../models'); // Import the Service model

// Function to generate the next serviceId
const generateServiceId = async () => {
  const services = await Service.findAll();
  const count = services.length;
  const nextId = count + 1; // Increment for the new service
  return `SER${String(nextId).padStart(3, '0')}`; // Format as SER001, SER002, etc.
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get service by ID
exports.getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create new service
exports.createService = async (req, res) => {
  const { ServiceName, staffId, price } = req.body;
  try {
    const newServiceId = await generateServiceId(); // Generate serviceId
    const newService = await Service.create({
      serviceId: newServiceId, // Add serviceId to the payload
      ServiceName,
      staffId,
      price,
    });
    res.status(201).json(newService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update service by ID
exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { ServiceName, staffId, price } = req.body;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    await service.update({
      ServiceName,
      staffId,
      price,
    });
    res.json({ message: 'Service updated successfully', service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete service by ID
exports.deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    await service.destroy();
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
