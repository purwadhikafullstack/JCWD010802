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
const productReportController = require("./productReportController")
const orderController = require("./orderController")
const shippingController = require("./shippingController")
const mutationController = require("./mutationController")
const dashboardController = require("./dashboardController")
const adminOrderController = require("./adminOrderController")
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
    productReportController,
    orderController,
    shippingController,
    mutationController,
    dashboardController,
    adminOrderController,
    reportController
}