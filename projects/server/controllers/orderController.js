const { order, cart, address, user, journal, stock, product, warehouse, cartItem } = require("../models");
const calculateDistance = require('../utils/calculateDistance');

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
};
