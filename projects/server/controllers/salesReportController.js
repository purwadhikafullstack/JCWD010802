const { order, orderItem, warehouseAdmin, product, category } = require("../models")

module.exports = {
  getSalesReport: async (req, res) => {
    try {
      const id = req.params.id
      const result = await order.findAll({
        include: [{
          model: orderItem,
          include: [{
            model: product,
            include: [{
              model: category,
            }, ],
          }, ],
        }, ],
      });
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
  chartReport: async (req, res) => {
    const warehouseId = +req.query.warehouseId || null;
    const condition = {};
    if (req.query.categoryId) {
      condition.categoryId = req.query.categoryId;
    }
    const date = req.query.date ? new Date(req.query.date) : null;
    try {
      const isAdmin = await warehouseAdmin.findOne({
        where: {
          userId: req.user.id,
        },
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
                  where: condition,
                  include: [
                    {
                      model: category,
                    },
                  ],
                },
              ],
            },
          ],
          where: {
            warehouseId: isAdmin.warehouseId,
          },
        });
      } else {
        result = await order.findAll({
          include: [
            {
              model: orderItem,
              include: [
                {
                  model: product,
                  where: condition,
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
  
      const monthlySalesByCategory = {};
      for (let month = 1; month <= 12; month++) {
        monthlySalesByCategory[month] = {};
      }
  
      result.forEach((order) => {
        const updatedAt = new Date(order.updatedAt);
        if (
          (warehouseId === null || order.warehouseId === warehouseId) &&
          order.statusId === 5 &&
          (!date || updatedAt.toDateString() === date.toDateString())
        ) {
          const month = updatedAt.getMonth() + 1;
          const totalPrice = parseFloat(order.totalPrice);
  
          order.orderItems.forEach((orderItem) => {
            const productId = orderItem.product.id;
            monthlySalesByCategory[month][productId] = 0;
          });
  
          order.orderItems.forEach((orderItem) => {
            const productId = orderItem.product.id;
            monthlySalesByCategory[month][productId] += totalPrice;
          });
        }
      });
  
      const monthlyTotal = [];
      for (let month = 1; month <= 12; month++) {
        const monthSales = {
          month,
          categorySales: monthlySalesByCategory[month],
        };
        monthlyTotal.push(monthSales);
      }
      for (const monthSales of monthlyTotal) {
        for (const productId in monthSales.categorySales) {
          const categoryInfo = await product.findByPk(productId);
          monthSales.categorySales[productId] = {
            productName: categoryInfo.name,
            totalSales: monthSales.categorySales[productId],
          };
        }
      }
      res.status(200).send({
        status: true,
        message: 'Report by category',
        monthlyTotal,
      });
    } catch (err) {
      console.error(err);
      res.status(400).send({
        status: false,
        message: err.message,
      });
    }
  },
  tableSalesReport: async (req, res) => {
    try {
      const userId = req.user ? req.user.id : null;
      const warehouseId = +req.query.warehouseId || null;
      const condition = {};
      if (req.query.categoryId) {
        condition.categoryId = req.query.categoryId;
      }
      const date = req.query.date ? new Date(req.query.date) : null;
  
      const isAdmin = await warehouseAdmin.findOne({
        where: {
          userId: userId,
        },
      });
  
      let orders;
      if (isAdmin && isAdmin.warehouseId !== null) {
        orders = await order.findAll({
          where: {
            warehouseId: isAdmin.warehouseId,
          },
          include: [
            {
              model: orderItem,
              include: [
                {
                  model: product,
                  where: condition,
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
      } else {
        if (warehouseId !== null) {
          orders = await order.findAll({
            where: {
              warehouseId: warehouseId,
            },
            include: [
              {
                model: orderItem,
                include: [
                  {
                    model: product,
                    where: condition,
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
        } else {
          orders = await order.findAll({
            include: [
              {
                model: orderItem,
                include: [
                  {
                    model: product,
                    where: condition,
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
      }
      const productMap = new Map();
      orders.forEach((order) => {
  const { updatedAt, orderItems, warehouseId } = order;
  if (date) {
    const productDate = new Date(updatedAt);
    if (productDate.toDateString() !== date.toDateString()) {
      return;
    }
  }

  orderItems.forEach((orderItem) => {
    const { id, name, categoryId, category } = orderItem.product || {};
    if (!productMap.has(id)) {
      productMap.set(id, {
        id: id,
        name: name,
        totalPrice: 0,
        quantity: 0,
        categoryId: categoryId,
        category: category ? category.name : null,
        warehouseId,
        updatedAt,
      });
    }
    const productInfo = productMap.get(id);
    productInfo.totalPrice += +order.totalPrice;
    productInfo.quantity += orderItem.quantity;
  });
});
      const result = Array.from(productMap.values()).filter((productInfo) => {
        if (date) {
          const productDate = new Date(productInfo.updatedAt);
          return productDate.toDateString() === date.toDateString();
        }
        return true;
      });
  
      res.status(200).send({
        status: true,
        message: 'Detail of sales',
        result,
      });
    } catch (err) {
      console.error(err);
      res.status(400).send({
        status: false,
        message: err.message,
      });
    }
  },
}