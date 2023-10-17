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
  
      // Calculate the date range for this month and last month
      const today = new Date();
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      lastMonth.setDate(1); // Set it to the 1st of last month
  
      const totalSalesThisMonth = await order.sum('totalPrice', {
        where: {
          statusId: [4, 5],
          createdAt: {
            [Op.gte]: lastMonth, // Filter orders created on or after the 1st of last month
            [Op.lt]: today, // Filter orders up to the current date
          },
        },
      });
  
      // Query total sales per product
      const productSales = await orderItem.findAll({
        attributes: [
          "productId",
          [sequelize.fn('sum', sequelize.col('quantity')), 'totalQuantity'],
          [literal('SUM(quantity * product.price)'), 'totalSales'],
        ],
        include: [
          {
            model: product,
            attributes: ["price","name"], // Include product price
          },
        ],
        group: ["productId", "product.id", "product.price"],
      });
      const productSalesByCategory = await orderItem.findAll({
        attributes: [
          [sequelize.col('product.categoryId'), 'categoryId'], // Include categoryId from Product
          [sequelize.fn('sum', sequelize.col('quantity')), 'totalQuantity'],
          [sequelize.literal('SUM(quantity * product.price)'), 'totalSales'],
        ],
        include: [
          {
            model: product,
            attributes: ["price", "name", "categoryId"],
            include:[{
              model:category,
              attributes:["name"]
            }], // Include categoryId from Product
          },
        ],
        group: ["product.categoryId"], // Group by categoryId
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
        productSales: productSales, // Includes product price, total quantity, and total sales
        categorySales:productSalesByCategory
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  },
  
};
