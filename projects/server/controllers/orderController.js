const {  cart, address, user, journal, stock, product, warehouse, cartItem,orderItem,status } = require("../models");
const calculateDistance = require('../utils/calculateDistance');
const db = require("../models")
const orders = db.order
module.exports = {
    checkout: async (req, res) => {
        try {
            const {
                cartId,
                addressId,
                shippingMethod,
                shippingCost,
            } = req.body; 
            const findCartItem = await cartItem.findAll({ where: { cartId: cartId } });
            const findAddress = await address.findOne({ where: { id: addressId } });
            const findCart = await cart.findOne({where:{userId:req.user.id, isCheckOut:false}})
            const warehouses = await warehouse.findAll({ include: { model: address } });
            
            if (warehouses.length === 0) {
                return res.status(404).send({ error: 'No warehouses found.' });
            }

            let nearestWarehouse = null;
            let shortestDistance = Infinity;
            warehouses.forEach((warehouse) => {
                const distance = calculateDistance(
                    parseFloat(findAddress.lat),
                    parseFloat(findAddress.lng),
                    parseFloat(warehouse.address.lat),
                    parseFloat(warehouse.address.lng)
                );
                if (distance < shortestDistance) {
                    shortestDistance = distance;
                    nearestWarehouse = warehouse.id;
                }
            });

            if (!nearestWarehouse) {
                return res.status(404).json({ error: 'Nearest warehouse not found.' });
            }
            const productQuantityToSubtract = new Map();

            for (const item of findCartItem) {
                const sproduct = await product.findByPk(item.productId);

                if (!sproduct) {
                    return res.status(404).send({ error: 'Product not found.' });
                }

                const stockEntry = await stock.findOne({
                    where: {
                        productId: sproduct.id,
                        warehouseId: nearestWarehouse,
                    },
                });

                const currentQuantityToSubtract = productQuantityToSubtract.get(sproduct.id) || 0;
                productQuantityToSubtract.set(sproduct.id, currentQuantityToSubtract + item.quantity);
            }
            
            const response = await orders.create({
                userId:req.user.id,
                totalPrice:findCart.totalPrice,
                shippingCost,
                shippingMethod,
                addressId,
                cartId,
                statusId:1,
                warehouseId: nearestWarehouse

            })

            for (const [productId, totalQuantity] of productQuantityToSubtract.entries()) {
                const stockEntry = await stock.findOne({
                    where: {
                        productId: productId,
                        warehouseId: nearestWarehouse,
                    },
                });

                if (stockEntry) {
                    stockEntry.quantity -= totalQuantity;
                    await stockEntry.save();

                    const newJournal = await journal.create({
                     description: "reduce",
                     quantity: -totalQuantity,
                     stockId: stockEntry.id,
                     orderId: response.id
                    })
                }
            }

            const stockWarehouse = await stock.findAll({ where: { warehouseId: nearestWarehouse } });


            const cartCheckout = await cart.update(
                { isCheckOut: true },
                {
                    where: {
                        id: cartId
                    }
                }
            );
            
            res.status(200).send({
                response,
                cartCheckout,
                stockWarehouse,
                status: true
            });

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error.' });
        }
    },
    userOrder: async(req,res)=>{
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 5;
            const offset = (page - 1) * limit;
            const statuses = req.query.statuses || '';
            const sortDir = req.query.sortDir || 'asc';
            const warehouseId = req.query.warehouseId
            const shipping = req.query.shipping || ""
        
            const whereClause = {}
        
            if (statuses) {
              whereClause.statusId = statuses;
            }
            if (warehouseId) {
              whereClause.warehouseId= warehouseId;
            }
            if(shipping){
                whereClause.shippingMethod = shipping
            }
            const order = [['createdAt', sortDir]];             
            const result = await orders.findAll(
                {
                    include: [{
                        model: orderItem, include:{model:product}
                    },{model:status}, {model:warehouse}],
                    offset,
                    limit, 
                    order,
                    where: whereClause,
                }
            );
            const total = await orders.count({
                where:whereClause
            })
            res.status(200).send({
                status: true,
                message: 'all user order',
                totalpage:Math.ceil(total/limit),
                currentpage:page,
                total_order:total,
                result,
            });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },
    userWarehouseOrder: async(req,res)=>{
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 5;
            const offset = (page - 1) * limit;
            const statuses = req.query.statuses || '';
            const sortDir = req.query.sortDir || 'asc';
            const { id } = req.params;
            const shipping = req.query.shipping || ""

            const whereClause = {
                warehouseId: id
            }
        
            if (statuses) {
              whereClause.statusId = statuses;
            }
            if(shipping){
                whereClause.shippingMethod = shipping
            }
           
            const order = [['createdAt', sortDir]];             
            const result = await orders.findAll(
                {
                    include: [{
                        model: orderItem, include:{model:product}
                    },{model:status}, {model:warehouse}],
                    offset,
                    limit, 
                    order,
                    where: whereClause,
                }
            );
            const total = await orders.count( {
                include: [{
                    model: orderItem, include:{model:product}
                },{model:status}, {model:warehouse}],
                where: whereClause,
            })
            res.status(200).send({
                status: true,
                message: 'all user order',
                totalpage:Math.ceil(total/limit),
                currentpage:page,
                total_order:total,
                result,
            });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },
    getStatus : async(req,res)=>{
        try {
            const result = await status.findAll()
            res.status(200).send({
                status: true,
                result})
        } catch (error) {
            console.log(error);
        }
    }
};
