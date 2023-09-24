const moment = require("moment");
const { order, status } = require('../models');
const { Op } = require('sequelize');

const runAutoConfirm = async () => {
  try {
    const sevenDaysAgoStart = moment().subtract(7, 'days').startOf('day').toDate();
    const sevenDaysAgoEnd = moment().subtract(7, 'days').endOf('day').toDate();

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
        [Op.between]: [sevenDaysAgoStart, sevenDaysAgoEnd]
      }
    });

    for (const orderItem of orders) {
        const result = await order.update({ statusId: 5 }, {
            where: {
                id: orderItem.id
            }
        })
        console.log(result);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = runAutoConfirm
