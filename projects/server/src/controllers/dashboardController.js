const { category, product, warehouseAdmin, warehouse, user,sequelize,order,orderItem } = require("../models");
const { Op,literal } = require("sequelize");

module.exports = {

  basicInfo: async (req, res) => {
    try {
      const totalVerifiedUsers = await user.count({
        where: { roleId: 1, isVerified: true },
      });
  
      const totalUnverifiedUsers = await user.count({
        where: { roleId: 1, isVerified: false },
      });
  
      const categoriesWithProductCount = await category.findAll({
        attributes: [
          "id",
          "name",
          [
            sequelize.fn("COUNT", sequelize.col("products.id")),
            "productCount",
          ],
        ],
        include: [
          {
            model: product,
            as: "products",
            attributes: [],
          },
        ],
        group: ["category.id", "category.name"],
      });
  
      const totalProduct = await product.count({});
      const totalCategory = await category.count({});
      const totalWarehouse = await warehouse.count({});
      const totalAdmin = await warehouseAdmin.count({});
      const totalUser = await user.count({});
  
      const today = new Date();
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      lastMonth.setDate(1); 
  
      const totalSalesThisMonth = await order.sum('totalPrice', {
        where: {
          statusId: [4, 5],
          createdAt: {
            [Op.gte]: lastMonth, 
            [Op.lt]: today, 
          },
        },
      });
  
      const productSales = await orderItem.findAll({
        attributes: [
          "productId",
          [sequelize.fn('sum', sequelize.col('quantity')), 'totalQuantity'],
          [literal('SUM(quantity * product.price)'), 'totalSales'],
        ],
        include: [
          {
            model: product,
            attributes: ["price", "name"],
          },
          {
            model: order,
            where: { statusId: [4, 5] }, 
          },
        ],
        group: ["productId", "product.id", "product.price"],
      });
      
      const productSalesByCategory = await orderItem.findAll({
        attributes: [
          [sequelize.col('product.categoryId'), 'categoryId'],
          [sequelize.fn('sum', sequelize.col('quantity')), 'totalQuantity'],
          [sequelize.literal('SUM(quantity * product.price)'), 'totalSales'],
        ],
        include: [
          {
            model: product,
            attributes: ["price", "name", "categoryId"],
            include: [
              {
                model: category,
                attributes: ["name"],
              },
            ],
          },
          {
            model: order,
            attributes: [],
            where: { statusId: [4, 5] }, 
          },
        ],
        group: ["product.categoryId"],
      });
      
      
  
      res.status(200).send({
        totalUser: totalUser,
        totalVerifiedUsers: totalVerifiedUsers,
        totalUnverifiedUsers: totalUnverifiedUsers,
        totalProduct: totalProduct,
        totalCategory: totalCategory,
        totalWarehouse: totalWarehouse,
        totalAdmin: totalAdmin,
        categoriesWithProductCount: categoriesWithProductCount,
        totalSalesThisMonth: totalSalesThisMonth,
        productSales: productSales, 
        categorySales:productSalesByCategory
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  },
  
};
