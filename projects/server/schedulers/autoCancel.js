const { order, stock, orderItem, journal } = require('../models');
const { Op } = require('sequelize');

const runAutoCancel = async () => {
  try {
    const expireDate = new Date()
    expireDate.setDate(expireDate.getDate() - 1)

    const orders = await order.findAll({
      where: {
        paymentExpiredAt: { [Op.lte]: expireDate },
        paymentProof: null,
        statusId: 1
      },
      include: [{ model: orderItem }]
    });

    for (const orderList of orders) {
        const result = await order.update({ statusId: 6 }, {
            where: {
                id: orderList.id
            }
        })
        orderList.orderItems.forEach( async (item) => {
          const findStock = await stock.findOne({
            where: {
              productId: item.productId,
              warehouseId: orderList.warehouseId
            }
          })
          await stock.update(
            { quantity: findStock.quantity + item.quantity},
            { where: { id: findStock.id }}
          )
          await journal.create({
            description: "add",
            quantity: item.quantity,
            stockId: findStock.id,
            orderId: orderList.id
          })
        })
        console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = runAutoCancel
