const { order, orderItem, warehouseAdmin, product, category } = require("../models")

module.exports = {
    getSalesReport: async (req, res) => {
        try {
            const id = req.params.id
            const result = await order.findAll(
                {
                    include: [{
                        model: orderItem
                    }]
                }
            );
            res.status(200).send({
                status: true,
                message: 'Detail of sales',
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
    monthReport: async (req, res) => {
        const warehouseId = +req.query.warehouseId || null;
        const monthly = req.query.monthly || null;
    
        try {
            const isAdmin = await warehouseAdmin.findOne({
                where: {
                    userId: req.user.id,
                },
            });
            let result;
            if (isAdmin) {
                result = await order.findAll({
                    include: [{
                        model: orderItem
                    }], where: {warehouseId: isAdmin.warehouseId}
                });
            } else {
                result = await order.findAll({
                    include: [{
                        model: orderItem
                    }]
                });
            }
            const monthlyTotal = {};
            result.forEach((order) => {
                const updatedAt = new Date(order.updatedAt);
                const monthYearKey = `${updatedAt.getFullYear()}-${(updatedAt.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}`;
    
                if ((warehouseId === null || order.warehouseId === warehouseId) && order.statusId === 5) {
                    if (monthly === null || monthYearKey === monthly) {
                        if (!monthlyTotal[monthYearKey]) {
                            monthlyTotal[monthYearKey] = parseFloat(order.totalPrice);
                        } else {
                            monthlyTotal[monthYearKey] += parseFloat(order.totalPrice);
                        }
                    }
                }
            });
    
            res.status(200).send({
                status: true,
                message: 'Report by month',
                result: monthlyTotal,
            });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },

    categoryMonthReport: async (req, res) => {
        const warehouseId = +req.query.warehouseId || null;
        const monthly = req.query.monthly || null;
        const condition = {};
        if (req.query.categoryId) {
          condition["id"] = req.query.categoryId;
        }
      
        try {
          const isAdmin = await warehouseAdmin.findOne({
            where: { userId: req.user.id },
          });
      
          let result;
          if (isAdmin) {
            result = await order.findAll({
              include: [
                {
                  model: orderItem,
                  include: [
                    {
                      model: product,
                      include: [
                        {
                          model: category,
                          where: condition,
                        },
                      ],
                    },
                  ],
                },
              ],
              where: { warehouseId: isAdmin.warehouseId },
            });
          } else {
            result = await order.findAll({
              include: [
                {
                  model: orderItem,
                  include: [
                    {
                      model: product,
                      include: [
                        {
                          model: category,
                        },
                      ],
                    },
                  ],
                },
              ],
            });
          }
      
          const monthlyTotal = Array.from({ length: 12 }, (_, month) => ({
            month: month + 1,
            total: 0,
          }));
      
          result.forEach((order) => {
            const updatedAt = new Date(order.updatedAt);
            const month = updatedAt.getMonth() + 1;
            const totalPrice = parseFloat(order.totalPrice);
      
            if (
              (warehouseId === null || order.warehouseId === warehouseId) &&
              order.statusId === 5
            ) {
              if (monthly === null) {
                monthlyTotal[month - 1].total += totalPrice;
              } else {
                if (monthlyTotal[month - 1]) {
                  monthlyTotal[month - 1].total += totalPrice;
                }
              }
            }
          });
      
          res.status(200).send({
            status: true,
            message: 'Report by category',
            monthlyTotal,
          });
        } catch (err) {
          console.error(err);
          res.status(400).send({ status: false, message: err.message });
        }
      },
      productMonthReport: async (req, res) => {
        const warehouseId = +req.query.warehouseId || null;
        const monthly = req.query.monthly || null;
        const condition = {}
        if (req.query.productId) {
            condition["productId"] = req.query.productId
        }
        try {
            const isAdmin = await warehouseAdmin.findOne({
                where: {
                    userId: req.user.id,
                },
            });
            let result;
            if (isAdmin) {
                result = await order.findAll({
                    include: [{
                        model: orderItem, include: [{
                            model: product,
                        }], where: condition
                    }], where: { warehouseId: isAdmin.warehouseId }
                });
            } else {
                result = await order.findAll({
                    include: [{
                        model: orderItem, include: [{
                            model: product,
                        }], where: condition
                    }]
                });
            }
    
            const monthlyTotal = [];
                for (let year = new Date().getFullYear(); year <= new Date().getFullYear(); year++) {
                for (let month = 1; month <= 12; month++) {
                    const monthYearKey = `${year}-${month.toString().padStart(2, '0')}`;
                    monthlyTotal.push({
                        monthYear: monthYearKey,
                        total: 0,
                    });
                }
            }
    
            result.forEach((order) => {
                const updatedAt = new Date(order.updatedAt);
                const monthYearKey = `${updatedAt.getFullYear()}-${(updatedAt.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}`;
    
                if ((warehouseId === null || order.warehouseId === warehouseId) && order.statusId === 5) {
                    if (monthly === null || monthYearKey === monthly) {
                        const index = monthlyTotal.findIndex(item => item.monthYear === monthYearKey);
                        if (index !== -1) {
                            monthlyTotal[index].total += parseFloat(order.totalPrice);
                        }
                    }
                }
            });
            res.status(200).send({
                status: true,
                message: 'Report by product',
                monthlyTotal,
            });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },
    
}