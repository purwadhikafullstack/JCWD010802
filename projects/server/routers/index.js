const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const addressRouter = require('./addressRouter')
const rajaongkirRouter = require('./rajaOngkirRouter'); 
const categoryRouter = require('./categoryRouter');
const productRouter = require("./productRouter")
const stockRouter = require("./stockRouter")
const userRouters = require('./userRouters') //--- Perbaiki
const adminRouters = require("./adminRouters")
const warehouseRouter = require("./warehouseRouter")
const authRouters = require('./authRouters')
const cartRouter = require('./cartRouter')
const orderRouter = require('./orderRouter')
const shippingRouter = require('./shippingRouter')



module.exports= {
    userRouters,
    adminRouters,
    warehouseRouter,
    authRouters,
    authRouter,
    userRouter,
    addressRouter,
    rajaongkirRouter,
    productRouter,
    stockRouter,
    categoryRouter,
    cartRouter,
    orderRouter,
    shippingRouter
}