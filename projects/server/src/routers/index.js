const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const addressRouter = require('./addressRouter')
const rajaongkirRouter = require('./rajaOngkirRouter'); 
const categoryRouter = require('./categoryRouter');
const productRouter = require("./productRouter")
const stockRouter = require("./stockRouter")
const userRouters = require('./userRouters') 
const adminRouters = require("./adminRouters")
const warehouseRouter = require("./warehouseRouter")
const authRouters = require('./authRouters')
const cartRouter = require('./cartRouter')
const shippingRouter = require('./shippingRouter')
const productReportRouter = require('./productReportRouter')
const salesReportRouter = require('./salesReportRouter')
const orderRouter = require('./orderRouter')
const mutationRouter = require("./mutationRouter")
const dashboardRouter = require("./dashboardRouter")
const adminOrderRouter = require("./adminOrderRouter")
const bannerRouter = require("./bannerRouter")

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
    shippingRouter,
    productReportRouter,
    salesReportRouter,
    orderRouter,
    mutationRouter,
    dashboardRouter,
    adminOrderRouter,
    bannerRouter
}