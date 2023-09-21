const userController = require('./userController');
const addressController = require('./addressController');
const rajaOngkirController = require('./rajaOngkirController')
const userControllers= require('./userControllers') //--- Perbaiki
const adminControllers = require("./adminControllers")
const warehouseController = require('./warehouseController')
const authControllers = require('./authControllers')
const authController = require("./authController")
const productController = require("./productController")
const stockController = require("./stockController")
const categoryController = require("./categoryController")
const cartController = require("./cartController")
const shippingController = require("./shippingController")
const reportController = require("./reportController")

module.exports = {
    userControllers,
    adminControllers,
    warehouseController,
    authControllers,
    authController,
    userController,
    addressController,
    rajaOngkirController,
    productController,
    stockController,
    categoryController,
    cartController,
    shippingController,
    reportController
}