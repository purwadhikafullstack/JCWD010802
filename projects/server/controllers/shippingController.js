// controllers/warehouseController.js
const calculateDistance = require('../utils/calculateDistance');
const {warehouse,address} = require('../models'); // Assuming you have a model for your warehouses

module.exports = {
  findNearestWarehouse: async (req, res) => {
    try {
      // User's location (latitude and longitude)
      const {lat,lng} = req.body
      const userLat = parseFloat(lat);
      const userLon = parseFloat(lng);

      if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({ error: 'Invalid user location coordinates.' });
      }

      // Find all warehouses in your database (you may need to adjust this based on your database setup)
      const warehouses = await warehouse.findAll({include:{model:address}});

      if (warehouses.length === 0) {
        return res.status(404).json({ error: 'No warehouses found.' });
      }

      // Calculate distances to all warehouses and find the nearest one
      let nearestWarehouse = null;
      let shortestDistance = Infinity;
      warehouses.forEach(warehouse => {
        const distance = calculateDistance(userLat, userLon, warehouse.address.lat, warehouse.address.lng);
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestWarehouse = warehouse;
        }
      });

      res.status(200).json({
        nearestWarehouse,
        shortestDistance,
      });
    } catch (err) {
        res.status(400).send({
            status: false,
            message: err.message
        });
    }
  },
};
