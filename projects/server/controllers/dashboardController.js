const { category, product, warehouseAdmin, warehouse, user,sequelize,order } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  basicInfo: async (req, res) => {
    try {
      const totalUser = await user.count();
      const totalAdmin = await warehouseAdmin.count();
      const totalWarehouse = await warehouse.count();
      const totalProduct = await product.count();
      const totalCategory = await category.count();
      const totalOrder = await order.count()

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

      res.status(200).send({
        totalUser,
        totalAdmin,
        totalWarehouse,
        totalProduct,
        totalCategory,
        categoriesWithProductCount,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  },
};
