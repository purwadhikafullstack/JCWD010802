const { order, orderItem, user, status, product, stock, warehouse, requestHistory, journal ,address} = require("../models")
const calculateDistance = require("../utils/calculateDistance")

module.exports = {
    confirmPayment: async (req, res) => {
        try {
            const { id } = req.params;

            const isAdmin = await user.findOne({ where: { id: req.user.id } });
            if (isAdmin.roleId === 1) throw { message: "Only admin can access this feature" };

            const isOrderExist = await order.findOne({
                where: { id },
                include: [{ model: orderItem }],
            });

            if (!isOrderExist) throw { message: "Order not found" };
            if (isOrderExist.statusId !== 2) throw { message: "Invalid Order Status" };

            const orderDetails = await orderItem.findAll({
                where: { orderId: isOrderExist.id },
            });
            const warehouses = await warehouse.findAll({
                where: {
                    isDeleted: false
                },
                include:[{ model:address }]
            });

            for (const orderDetail of orderDetails) {
                const { productId, quantity } = orderDetail;

                const checkStock = await stock.findOne({
                    where: {
                        warehouseId: isOrderExist.warehouseId,
                        productId,
                    },
                });

                if (checkStock?.quantity < 0) {
                    const orderDetails = await orderItem.findAll({
                        where: { orderId: isOrderExist.id },
                        attributes: ['productId', 'quantity'],
                    });
                    const warehouseStock = await stock.findOne({
                    where: { productId, warehouseId: warehouse.id },
                });
                    for (const orderDetail of orderDetails) {
                        const { productId, quantity } = orderDetail;

                        let sourceWarehouse = await warehouse.findOne({
                            where: { id: isOrderExist.warehouseId },
                            include: [{ model: address }],
                        });

                        if (!sourceWarehouse) {
                            return res.status(400).send(`No suitable source warehouse found for product ${productId}.`);
                        }

                        const sourceStock = await stock.findOne({
                            where: { productId, warehouseId: sourceWarehouse.id },
                        });

                        if (!sourceStock) {
                            return res.status(400).send(`No stock found for product ${productId} in source warehouse.`);
                        }

                        const remainingQuantity = quantity;

                        let nearestWarehouse = null;
                        let shortestDistance = Infinity;

                        const availableWarehouses = [];

                        warehouses.forEach((warehouse) => {
                            if (warehouse.id === sourceWarehouse.id) {
                                return;
                            }

                            const distance = calculateDistance(
                                parseFloat(sourceWarehouse.address.lat),
                                parseFloat(sourceWarehouse.address.lng),
                                parseFloat(warehouse.address.lat),
                                parseFloat(warehouse.address.lng)
                            );

                            if (distance < shortestDistance) {
                                shortestDistance = distance;
                                nearestWarehouse = warehouse.id;
                            }

                            if (warehouse.id !== sourceWarehouse.id) {
                            

                                if (warehouseStock && warehouseStock.quantity >= remainingQuantity) {
                                    availableWarehouses.push(warehouse.id);
                                }
                            }
                        });

                        if (!nearestWarehouse) {
                            return res.status(400).send(`No suitable nearest warehouse found for product ${productId}.`);
                        }

                        if (remainingQuantity > 0) {
                            for (const availableWarehouseId of availableWarehouses) {
                                const transferStock = await stock.findOne({
                                    where: { productId, warehouseId: availableWarehouseId },
                                });

                                const transferQuantity = Math.min(remainingQuantity, transferStock.quantity);

                                if (transferQuantity > 0) {
                                    await transferStock.update({ quantity: transferStock.quantity - transferQuantity });
                                    await sourceStock.update({ quantity: sourceStock.quantity + transferQuantity });

                                    const newhistory = await requestHistory.create({
                                        status: 'approved',
                                        from: availableWarehouseId,
                                        to: sourceWarehouse.id,
                                        stockId: transferStock.id,
                                        quantity: transferQuantity,
                                        type: 'automatic',
                                        orderId: id,
                                    });

                                    const newJournal = await journal.create({
                                        description: "reduce",
                                        quantity: transferQuantity,
                                        stockId: transferStock.id,
                                        requestHistoryId: newhistory.id,
                                    });

                                    remainingQuantity -= transferQuantity;
                                }

                                if (remainingQuantity === 0) {
                                    break; 
                                }
                            }
                        }
                    }
                }

                const result = await order.update({ statusId: 3 }, {
                    where: { id },
                });

                res.status(200).send({
                    result,
                    status: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    rejectPayment: async (req, res) => {
        try {
            const { id } = req.params
            const isAdmin = await user.findOne({ where: { id: req.user.id } })
            if (isAdmin.roleId === 1) throw { message: "Only admin can access this features"}
            const isOrderExist = await order.findOne({ where: { id }})
            if (!isOrderExist) throw { message: "Order not found" }
            if (isOrderExist.statusId !== 2) throw { message: "Invalid Order Status" }

            const result = await order.update({ statusId: 1, paymentProof: null }, { where: { id } })
            res.status(200).send({
                result,
                status: true,
            })
        } catch (error) {
            console.log(error);
        }
    },
    cancelOrder: async (req, res) => {
      try {
        const { id } = req.params
        const isAdmin = await user.findOne({ where: { id: req.user.id } })
        if (isAdmin.roleId === 1) throw { message: "Only admin can access this features"}
        const isOrderExist = await order.findOne({
          where: { id },
          include: [{ model: orderItem }]
        })
        if (!isOrderExist) throw { message: "Order not found" }
        if (isOrderExist.statusId === 4 || isOrderExist.statusId === 5) throw { message: "Invalid Order Status" }
        isOrderExist.orderItems.forEach(async (item) => {
          const findStock = await stock.findOne({
            where: {
              productId: item.productId,
              warehouseId: isOrderExist.warehouseId,
            },
          })
          await stock.update(
            { quantity: findStock.quantity + item.quantity },
            { where: { id: findStock.id } }
          )
          await journal.create({
            description: "add",
            quantity: item.quantity,
            stockId: findStock.id,
            orderId: id
          })
        })
        await order.update({ statusId: 6 }, { where: { id } })
        res.status(200).send({
            message: "Order cancelled",
            status: true,
        })
      } catch (error) {
        console.log(error);
      }
    },
    sendOrder: async (req, res) => {
      try {
        const { id } = req.params
        
        const completeDate = new Date()
        completeDate.setDate(completeDate.getDate() + 7)

        const isAdmin = await user.findOne({ where: { id: req.user.id } })
        if (isAdmin.roleId === 1) throw { message: "Only admin can access this features"}
        const isOrderExist = await order.findOne({ where: { id }})
        if (!isOrderExist) throw { message: "Order not found" }
        if (isOrderExist.statusId !== 3) throw { message: "Invalid Order Status" }

        const result = await order.update({ statusId: 4, completeExpiredAt: completeDate }, { where: { id } })
        res.status(200).send({
            result,
            status: true,
        })
      } catch (error) {
        console.log(error);
      }
    }
}