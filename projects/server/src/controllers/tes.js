const { order, cart, address, user, journal, stock, product, warehouse, cartItem,status,orderItem } = require("../models");
const calculateDistance = require('../utils/calculateDistance');
const { Op } = require("sequelize");
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
            
            const response = await order.create({
                userId:req.user.id,
                totalPrice:findCart.totalPrice,
                shippingCost,
                shippingMethod,
                addressId,
                cartId,
                statusId:1

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
    allOrder: async (req, res) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const offset = (page - 1) * limit;
            const search = req.query.search || "";
            const sort = req.query.sort || "asc";

            const filter = {};
            if (search) {
                filter[Op.or] = [
                    { name: { [Op.like]: `%${search}%`, }, },];
            }
            const isUserExist = await user.findOne({
                where: { id: req.user.id }
            })
            if (!isUserExist) throw { message: "User not found!" }
            const result = await order.findAll({
                where: { userId: req.user.id },
                attributes: { exclude: ['updatedAt'] },
                include: [
                    { model: orderItem, attributes: { exclude: ['createdAt', 'updatedAt'] }, 
                    include: [ { model: product, attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted', 'isActive']}, where: filter}] },
                    { model: status }
                ],
                limit,
                offset,
                sort
            })
            const total = await order.count({ where: { userId: req.user.id }})
            
            res.status(200).send({
                totalpage: Math.ceil(total / limit),
                currentpage: page,
                total_order: total,
                result,
                status: true,
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    },
    uploadPayment: async (req, res) => {
        try {
            const paymentImg = req.file.filename
            const { id } = req.params

            const isOrderExist = await order.findOne({ where: { id } })
            if (!isOrderExist) throw { message: "Order not found!" }
            if (isOrderExist.userId !== req.user.id) throw { message: "Invalid account" }
            if (isOrderExist.paymentProof) throw { message: "Order already paid" }
            const result = await order.update({ paymentProof: paymentImg }, {
                where: { id, userId: req.user.id }
            })
            res.status(200).send({
                result,
                status: true,
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    },
    cancelOrder: async (req, res) => {
        try {
            const { id } = req.params
            const isOrderExist = await order.findOne({ where: { id }})
            if (!isOrderExist) throw { message: "Order not found!" }
            if (isOrderExist.userId !== req.user.id) throw { message: "Invalid account" }
            if (isOrderExist.paymentProof) throw { message: "Cannot cancel your order" }
            const result = await order.update({ statusId: 6 }, {
                where: { id, userId: req.user.id }
            })
            res.status(200).send({
                status: true,
                message: "Order canceled!",
                result,
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    },
    confirmOrder: async (req, res) => {
        try {
            const { id } = req.params
            const isOrderExist = await order.findOne({ where: { id }})
            if (!isOrderExist) throw { message: "Order not found!" }
            if (isOrderExist.userId !== req.user.id) throw { message: "Invalid account" }
            if (isOrderExist.statusId < 4) throw { message: "Your order still in process"}
            if (isOrderExist.statusId === 6) throw { message: "Your order is canceled"}
            const result = await order.update({ statusId: 5 }, {
                where: { id, userId: req.user.id }
            })
            res.status(200).send({
                status: true,
                message: "Your order is completed!",
                result,
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    },
}