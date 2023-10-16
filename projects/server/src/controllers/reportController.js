const { cart, address, user, category, journal, stock, product, warehouse, cartItem, orderItem, status } = require("../models");
const { Op, Sequelize } = require("sequelize");
const db = require("../models");
const orders = db.order;

module.exports = {
    productChart: async (req, res) => {
      try {
        const categoryId = req.query.categoryId || "";
        const productId = req.query.productId || "";
  
        const whereCondition = {};
      if (categoryId || productId) {
        whereCondition[Op.or] = [];
        if (categoryId) {
          whereCondition[Op.or].push({ '$orderItems.product.category.id$': categoryId });
        }
        if (productId) {
          whereCondition[Op.or].push({ '$orderItems.product.id$': productId });
        }
      }
  
        const isAdmin = await user.findOne({ where: { id: req.user.id } });
        if (isAdmin.roleId === 1) {
          throw { message: "User not authorized" };
        }
  
        const result = await orders.findAll({
          attributes: [
            [db.sequelize.fn('date', db.sequelize.col('order.updatedAt')), 'date'],
            [db.sequelize.fn('sum', db.sequelize.col('totalPrice')), 'totalPrice'],
            'orderItems.orderId',
          ],
          include: [
            {
              model: orderItem,
              attributes: [],
              include: [
                {
                  model: product,
                  include: [
                    {
                      model: category,
                      attributes: ['name'],
                    },
                  ],
                },
              ],
            },
          ],
          where: whereCondition,
          group: [
            db.sequelize.fn('date', db.sequelize.col('order.updatedAt')),
            'order.id',
            'orderItems.id',
          ],
          order: [
            [db.sequelize.fn('date', db.sequelize.col('order.updatedAt')), 'ASC'],
          ],
        });
  
        // Memproses hasil untuk menggabungkan total harga berdasarkan tanggal
        const resultReport = [];
        let currentDate = null;
        let currentTotalPrice = 0;
  
        for (let i = 0; i <= result.length; i++) {
          const currentDateStr = result[i]?.dataValues.date;
          const totalPrice = parseInt(result[i]?.dataValues.totalPrice);
  
          if (currentDate === null) {
            // Inisialisasi tanggal pertama
            currentDate = currentDateStr;
            currentTotalPrice = totalPrice;
          } else if (currentDate === currentDateStr) {
            // Tanggal sama, tambahkan ke total
            currentTotalPrice += totalPrice;
          } else {
            // Tanggal berbeda, tambahkan ke hasil akhir
            resultReport.push({ date: currentDate, totalPrice: currentTotalPrice });
            currentDate = currentDateStr;
            currentTotalPrice = totalPrice;
          }
        }
  
        // Menambahkan data terakhir setelah perulangan selesai
        // if (currentDate !== null) {
        //   resultReport.push({ date: currentDate, totalPrice: currentTotalPrice });
        // }
  
        res.status(200).send({ result, resultReport });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error });
      }
    },
  };
  
