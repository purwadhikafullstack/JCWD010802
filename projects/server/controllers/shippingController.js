const calculateDistance = require('../utils/calculateDistance');
const { warehouse, address } = require('../models');

module.exports = {
  findNearestWarehouse: async (req, res) => {
    try {
      const { lat, lng } = req.query; 
      const userLat = parseFloat(lat);
      const userLon = parseFloat(lng);

      if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({ error: 'Invalid user location coordinates.' });
      }
      const warehouses = await warehouse.findAll({ include: { model: address } });

      if (warehouses.length === 0) {
        return res.status(404).json({ error: 'No warehouses found.' });
      }

      let nearestWarehouse = null;
      let shortestDistance = Infinity;
      warehouses.forEach((warehouse) => {
        const distance = calculateDistance(userLat, userLon, warehouse.address.lat, warehouse.address.lng);
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestWarehouse = warehouse;
        }
      });

      res.status(200).json({
        nearestWarehouse,
        shortestDistance,
        origin: nearestWarehouse.address.kota,
      });
    } catch (err) {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    }
  },
};
