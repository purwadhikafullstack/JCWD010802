const { Op } = require("sequelize");
const { order, orderItem, user, status, product, stock, warehouse, requestHistory,journal ,address} = require("../models")
const calculateDistance = require("../utils/calculateDistance")
module.exports = {
    confirmPayment: async (req, res) => {
        try {
            const { id } = req.params
            
            const isAdmin = await user.findOne({ where: { id: req.user.id } })
            if (isAdmin.roleId === 1) throw { message: "Only admin can access this features"}
            const isOrderExist = await order.findOne({
                where: { id },
                include: [{ model: orderItem }]
            })
            if (!isOrderExist) throw { message: "Order not found" }
            if (isOrderExist.statusId !== 2) throw { message: "Invalid Order Status" }
            const orderDetails = await orderItem.findAll({
                where: { orderId: isOrderExist.id },
                attributes: ['productId', 'quantity'],
            });
    
            for (const orderDetail of orderDetails) {
                const { productId, quantity } = orderDetail;
    
                const checkStock = await stock.findOne({
                    where: {
                        warehouseId: isOrderExist.warehouseId,
                        productId
                    }
                });
            if (checkStock.quantity < 0) {
                const orderDetails = await orderItem.findAll({
                    where: { orderId: isOrderExist.id },
                    attributes: ['productId', 'quantity'],
                  });
              
                  for (const orderDetail of orderDetails) {
                    const { productId, quantity } = orderDetail;
              
                    let sourceWarehouse = await warehouse.findOne({ where: { id: isOrderExist.warehouseId }, include:[{model:address}] });
              
                    if (!sourceWarehouse) {
                      return res.status(400).send(`No suitable source warehouse found for product ${productId}.`);
                    }
              
                    const sourceStock = await stock.findOne({
                      where: { productId, warehouseId: sourceWarehouse.id },
                    });
              
                    if (!sourceStock) {
                      return res.status(400).send(`No stock found for product ${productId} in source warehouse.`);
                    }
              
                    const stockJournal = await journal.findOne({
                      where: { stockId: sourceStock.id, orderId:id },
                    });
              
                    if (!stockJournal) {
                      return res.status(400).send(`No reserved stock found for product ${productId} in source warehouse.`);
                    }
              
                    const reservedQuantity = stockJournal.quantity;
              
                    const availableStock = sourceStock.quantity ;
                    const warehouses = await warehouse.findAll({include:[{model:address}]});
                    if (availableStock < quantity) {
                        let nearestWarehouse = null;
                        let shortestDistance = Infinity;
                        warehouses.forEach((warehouse) => {
                            if (warehouse.id === sourceWarehouse.id) {
                                // Skip the source warehouse
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
                                console.log(`${distance} from ${nearestWarehouse}`);
                            }
                        });
                        console.log(nearestWarehouse);
              
                      if (!nearestWarehouse) {
                        return res.status(400).send(`No suitable nearest warehouse found for product ${productId}.`);
                      }
              
                      const transferStock = await stock.findOne({
                        where: { productId, warehouseId: nearestWarehouse },
                      });
                    //   console.log(transferStock);
                      if (!transferStock || transferStock.quantity < quantity) {
                        return res.status(400).send(`Insufficient stock for product ${productId}.`);
                      }
              
                      await transferStock.update({ quantity: transferStock.quantity - quantity });
                      await sourceStock.update({ quantity: sourceStock.quantity + quantity });
              
                      const newhistory =  await requestHistory.create({
                        status: 'approved',
                        from: nearestWarehouse,
                        to: sourceWarehouse.id,
                        stockId: transferStock.id,
                        quantity,
                        type: 'automatic',
                        orderId: id,
                      });
                      const newJournal = await journal.create({
                        description: "reduce",
                        quantity: quantity,
                        stockId: transferStock.id,
                        requestHistoryId: newhistory.id
                       })
                       const result = await order.update({ statusId: 3 }, {
                        where: { id }
                    })
                    await journal.create({
                        description: "add",
                        quantity: quantity,
                        stockId: sourceStock.id,
                        requestHistoryId: newhistory.id
                    })
                    res.status(200).send({
                        result,
                        status: true,
                    })
                    }
              
                    // journal.update({ quantity: stockJournal.quantity + quantity });
                  }
            }

            
            const result = await order.update({ statusId: 3 }, {
                where: { id }
            })
            res.status(200).send({
                result,
                
                status: true,
            })
        }}catch (error) {
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

            const result = await order.update({ statusId: 1 }, {
                where: { id }
            })
            res.status(200).send({
                result,
                status: true,
            })
        } catch (error) {
            console.log(error);
        }
    },
}