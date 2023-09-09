const userController = require('./userController');
const addressController = require('./addressController');
const rajaOngkirController = require('./rajaOngkirController')

const userControllers= require('./userControllers') //--- Perbaiki
const adminControllers = require("./adminControllers")
const warehouseController = require('./warehouseController')
const authControllers = require('./authControllers')
const authController = require("./authController")

module.exports = {
    userControllers,
    adminControllers,
    warehouseController,
    authControllers,
    authController,
    userController,
    addressController,
    rajaOngkirController
}