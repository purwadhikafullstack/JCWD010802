const { order } = require('../models');
const { Op } = require('sequelize');

const runAutoConfirm = async () => {
  try {
    const completeDate = new Date()

    const orders = await order.findAll({
      where: {
        completeExpiredAt: { [Op.lte]: completeDate },
        statusId: 4
      }
    });

    for (const orderList of orders) {
        const result = await order.update({ statusId: 5 }, {
            where: {
                id: orderList.id
            }
        })
        console.log(result);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = runAutoConfirm
