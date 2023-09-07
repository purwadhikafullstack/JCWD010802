const userControllers= require('./userControllers')
const adminControllers = require("./adminControllers")
const warehouseControllers = require('./warehouseControllers')
const authControllers = require('./authControllers')
const authController = require("./authController")

module.exports = {
    userControllers,
    adminControllers,
    warehouseControllers,
    authControllers,
    authController,
}