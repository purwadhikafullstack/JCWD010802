const { order, orderItem, user, status, product, stock, warehouse, requestHistory, journal ,address} = require("../models")
const calculateDistance = require("../utils/calculateDistance")
const {Op} = require("sequelize")

module.exports = {
    confirmPayment: async (req, res) => {
        try {
            const { id } = req.params

            const isAdmin = await user.findOne({ where: { id: req.user.id } });
            if (isAdmin.roleId === 1) {
              return res.status(403).send("Only admin can access this feature");
            }
            
            const isOrderExist = await order.findOne({
              where: { id },
              include: [{ model: orderItem }],
            });
            
            if (!isOrderExist) {
              return res.status(404).send("Order not found");
            }
            
            if (isOrderExist.statusId !== 2) {
              return res.status(400).send("Invalid Order Status");
            }
            
            const orderDetails = await orderItem.findAll({
              where: { orderId: isOrderExist.id },
              attributes: ['productId', 'quantity'],
            });
            
            for (const orderDetail of orderDetails) {
              const { productId, quantity } = orderDetail;
            
              const checkStock = await stock.findOne({
                where: {
                  warehouseId: isOrderExist.warehouseId,
                  productId,
                },
              });
            
              if (checkStock.quantity < 0) {
                let sourceWarehouse = await warehouse.findOne({ where: { id: isOrderExist.warehouseId }, include: [{ model: address }] });
            
                if (!sourceWarehouse) {
                  return res.status(400).send(`No suitable source warehouse found for product ${productId}.`);
                }
            
                const sourceStock = await stock.findOne({
                  where: { productId, warehouseId: sourceWarehouse.id },
                });
            
                if (!sourceStock) {
                  return res.status(400).send(`No stock found for product ${productId} in the source warehouse.`);
                }
            
                const stockJournal = await journal.findOne({
                  where: { stockId: sourceStock.id, orderId: id },
                });
            
                if (!stockJournal) {
                  return res.status(400).send(`No reserved stock found for product ${productId} in the source warehouse.`);
                }
            
                const reservedQuantity = stockJournal.quantity;
            
                const availableStock = sourceStock.quantity;
                const warehouses = await stock.findAll({
                  where: {
                    isDeleted: false,
                    productId,
                    quantity: {
                      [Op.gte]: quantity,
                    },
                  },
                  include: [{ model: warehouse, include: { model: address } }],
                });
                console.log(warehouses);
                if (availableStock < quantity) {
                  let nearestWarehouse = null;
                  let nearestWarehouseName 
                  let shortestDistance = Infinity;
                  warehouses.forEach((warehouse) => {
                    if (warehouse.warehouseId === sourceWarehouse.id) {
                      return;
                    }
                    const distance = calculateDistance(
                      parseFloat(sourceWarehouse.address.lat),
                      parseFloat(sourceWarehouse.address.lng),
                      parseFloat(warehouse.warehouse.address.lat),
                      parseFloat(warehouse.warehouse.address.lng)
                    );
            
                    if (distance < shortestDistance) {
                      shortestDistance = distance;
                      nearestWarehouse = warehouse.warehouseId;
                      nearestWarehouseName = warehouse.warehouse.name


                    }
                  });
                  if (!nearestWarehouse) {
                    return res.status(400).send(`No suitable nearest warehouse found for product ${productId}.`);
                  }
                  const transferStock = await stock.findOne({
                    where: { productId, warehouseId: nearestWarehouse },
                  });
            
                  if (!transferStock || transferStock.quantity < quantity) {
                    return res.status(400).send(`Insufficient stock for product ${productId}.`);
                  }
            
                  await transferStock.update({ quantity: transferStock.quantity - quantity });
                  await sourceStock.update({ quantity: sourceStock.quantity + quantity });
            
                  const newhistory = await requestHistory.create({
                    status: 'approved',
                    from: nearestWarehouse,
                    to: sourceWarehouse.id,
                    from_name: nearestWarehouseName,
                    to_name: sourceWarehouse.name,
                    stockId: transferStock.id,
                    quantity,
                    type: 'automatic',
                    orderId: id,
                  });

                  const newJournalred = await journal.create({
                    description: "reduce",
                    quantity: -quantity,
                    stockId: transferStock.id,
                    requestHistoryId: newhistory.id,
                });
                  const newJournaladd = await journal.create({
                    description: "add",
                    quantity: quantity,
                    stockId: sourceStock.id,
                    requestHistoryId: newhistory.id,
                });
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