const { order, orderItem, warehouseAdmin, product, category, warehouse } = require("../models")

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
    try {
      const userId = req.user ? req.user.id : null;
      const warehouseId = +req.query.warehouseId || null;
      const productId = req.query.productId;
      const categoryId = req.query.categoryId;
      const date = req.query.date;
  
      const condition = {};
  
      const isAdmin = await warehouseAdmin.findOne({
        where: {
          userId: userId,
        },
      });
  
      let warehouseFilter = {};
  
      if (isAdmin && isAdmin.warehouseId !== null) {
        warehouseFilter = {
          warehouseId: isAdmin.warehouseId,
        };
      } else if (warehouseId !== null) {
        warehouseFilter = {
          warehouseId: warehouseId,
        };
      }
  
      let orders;
  
      orders = await order.findAll({
        where: warehouseFilter,
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
  
      const groupedResults = {}; 
  
      orders.forEach((order) => {
        const orderDate = new Date(order.createdAt).toISOString().slice(0, 10);
        const orderMonth = orderDate.slice(0, 7);
        if (date && orderMonth !== date) {
          return;
        }
  
        order.orderItems.forEach((item) => {
          if (
            (!productId || (productId && item.product.id == productId)) &&
            (!categoryId || (categoryId && item.product.category.id == categoryId))
          ) {
            if (!groupedResults[orderDate]) {
              groupedResults[orderDate] = [];
            }
  
            const productId = item.product.id;
            const name = item.product.name;
            const categoryId = item.product.category.id;
            const category = item.product.category.name;
            const totalProductPrice = item.product.price * item.quantity;
  
            groupedResults[orderDate].push({
              productId,
              name,
              categoryId,
              category,
              price: totalProductPrice,
            });
          }
        });
      });
  
      const groupedResultsArray = [];
  
      for (const orderDate in groupedResults) {
        const products = groupedResults[orderDate];
        const totalPrice = products.reduce(
          (total, product) => total + product.price,
          0
        );
  
        groupedResultsArray.push({
          orderDate,
          products,
          totalPrice,
        });
      }
  
      res.status(200).send({
        status: true,
        message: 'Result of chart report',
        result: groupedResultsArray,
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
      const productId = +req.query.productId || null;
      const condition = {};
      if (req.query.categoryId) {
        condition.categoryId = req.query.categoryId;
      }
  
      let dateParam = req.query.date || null;
      let date = null;
  
      if (dateParam) {
        if (/^\d{4}-\d{2}$/.test(dateParam)) {
          dateParam = dateParam + "-01";
        }
  
        date = new Date(dateParam);
      }
  
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
            {
              model: warehouse, // Include informasi gudang dalam order
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
              {
                model: warehouse, // Include informasi gudang dalam order
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
              {
                model: warehouse, // Include informasi gudang dalam order
              },
            ],
          });
        }
      }
  
      const productMap = new Map();
      orders.forEach((order) => {
        const { updatedAt, orderItems, warehouseId, warehouse: { name: warehouseName } } = order; // Mengambil nama gudang
  
        if (date) {
          const productDate = new Date(updatedAt);
          if (productDate.toISOString().slice(0, 7) !== date.toISOString().slice(0, 7)) {
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
              warehouseName, // Menyimpan nama gudang
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
          const productYear = productDate.getFullYear();
          const productMonth = productDate.getMonth();
  
          const filterDate = new Date(date);
          const filterYear = filterDate.getFullYear();
          const filterMonth = filterDate.getMonth();
  
          if (productYear !== filterYear || productMonth !== filterMonth) {
            return false;
          }
        }
  
        if (productId !== null && productInfo.id !== productId) {
          return false;
        }
  
        return true;
      });
  
      res.status(200).send({
        status: true,
        message: 'Result of table sales report',
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