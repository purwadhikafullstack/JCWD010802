const { category, product, warehouseAdmin, warehouse, user,sequelize } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  basicInfo: async (req, res) => {
    try {
      const totalVerifiedUsers = await user.count({
        where: { roleId: 1 ,isVerified: true },
      });

      const totalUnverifiedUsers = await user.count({
        where: { roleId:1, isVerified: false },
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
      const totalUser = await user.count();

      res.status(200).send({
        totalUser:totalUser,
        totalVerifiedUsers: totalVerifiedUsers,
        totalUnverifiedUsers: totalUnverifiedUsers,
        totalProduct: totalProduct,
        totalCategory: totalCategory,
        totalWarehouse: totalWarehouse,
        totalAdmin: totalAdmin,
        categoriesWithProductCount:categoriesWithProductCount
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
