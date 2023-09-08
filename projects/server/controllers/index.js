const userController = require('./userController');
const addressController = require('./addressController');
const rajaOngkirController = require('./rajaOngkirController')

const userControllers= require('./userControllers') //--- Perbaiki
const adminControllers = require("./adminControllers")
const warehouseControllers = require('./warehouseControllers')
const authControllers = require('./authControllers')
const authController = require("./authController")
const productController = require('./productController')
const categoryController = require('./categoryController')


module.exports = {
    userControllers,
    adminControllers,
    warehouseControllers,
    authControllers,
    authController,
    userController,
    addressController,
    rajaOngkirController,
    productController,
    categoryController
}