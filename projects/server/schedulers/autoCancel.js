const moment = require("moment");
const { order, status } = require('../models');
const { Op } = require('sequelize');

const runAutoCancel = async () => {
  try {
    const threeDaysAgoStart = moment().subtract(3, 'days').startOf('day').toDate();
    const threeDaysAgoEnd = moment().subtract(3, 'days').endOf('day').toDate();

    const orders = await order.findAll({
      attributes: { exclude: ['updatedAt'] },
      include: [
        {
          model: orderItem,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [{ model: product, attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted', 'isActive'] } }]
        },
        { model: status }
      ],
      where: {
        createdAt: {
            [Op.and]: {
                [Op.gte]: threeDaysAgoStart,
                [Op.lte]: threeDaysAgoEnd
            }
        },
        paymentProof: null
      }
    });

    for (const orderItem of orders) {
        const result = await order.update({ statusId: 6 }, {
            where: {
                id: orderItem.id
            }
        })
        console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = runAutoCancel
