const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const addressRouter = require('./addressRouter')
const rajaongkirRouter = require('./rajaOngkirRouter'); 
const productRouter = require("./productRouter")
const stockRouter = require("./stockRouter")
const userRouters = require('./userRouters') //--- Perbaiki
const adminRouters = require("./adminRouters")
const warehouseRouters = require("./warehouseRouters")
const authRouters = require('./authRouters')
const categoryRouter = require("./categoryRouter")


module.exports= {
    userRouters,
    adminRouters,
    warehouseRouters,
    authRouters,
    authRouter,
    userRouter,
    addressRouter,
    rajaongkirRouter,
    productRouter,
    stockRouter,
    categoryRouter
}