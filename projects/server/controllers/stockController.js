const db = require("../models");
const product = db.product;
const user = db.user;
const journal = db.journal;
const stock = db.stock;
const warehouse = db.warehouse;
const warehouseAdmin = db.warehouseAdmin;
const { Op } = require("sequelize");

module.exports = {
  warehouseStock: async (req, res) => {
    try {
      const { id } = req.user;
      const idWarehouse = req.query.warehouseId || "";
      const idCategory = req.query.categoryId;
      const sort = req.query.sort || "";
      const search = req.query.search;
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      const offset = (page - 1) * limit;
      const filter = {};
      const warehouseFilter = {}
      if (idWarehouse) {
        warehouseFilter.warehouseId = idWarehouse
      }
      if (search) {
        filter[Op.or] = [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
        ];
      }
      if (idCategory) {
        filter.categoryId = idCategory;
      }
      let order = [];
      if (sort === "A-Z") {
        order.push([{ model: product }, "name", "ASC"]);
      } else if (sort === "Z-A") {
        order.push([{ model: product }, "name", "DESC"]);
      } else if (sort === "lowest") {
        order.push([{ model: product }, "price", "ASC"]);
      } else if (sort === "highest") {
        order.push([{ model: product }, "price", "DESC"]);
      }

      let result;
      let stockSummary;
      let total;

      const isAdmin = await user.findOne({ where: { id } });
      if (isAdmin.roleId === 1)
        throw { message: "Only admin can access this feature" };

      const checkAdmin = await warehouseAdmin.findOne({
        where: { userId: id },
      });
      if (!checkAdmin) {
        result = await stock.findAll({
          include: [{ model: product, where: filter }, { model: warehouse }],
          where: warehouseFilter,
          limit,
          offset
      });
  
      // Menghapus duplikat berdasarkan productId dan menjaga total kuantitas
      const groupedStock = result.reduce((grouped, item) => {
          const { productId, quantity, warehouseId, id } = item;
          if (!grouped[productId]) {
              grouped[productId] = {
                  id,
                  productId,
                  totalQuantity: 0,
                  product: item.product,
                  warehouse: item.warehouse,
              };
          }
          grouped[productId].totalQuantity += quantity;
          return grouped;
      }, {});
      stockSummary = Object.values(groupedStock);
      if (order.length > 0) {
          stockSummary.sort((a, b) => {
              const field = order[0][1];
              const aValue = a.product[field];
              const bValue = b.product[field];
              
              if (aValue < bValue) return order[0][2] === 'ASC' ? -1 : 1;
              if (aValue > bValue) return order[0][2] === 'ASC' ? 1 : -1;
              return 0;
          });
      }
  
      total = stockSummary.length;
      } else {
        result = await stock.findAll({
          include: [{ model: product, where: filter }, { model: warehouse }],
          where: { warehouseId: checkAdmin.warehouseId },
          order,
          limit,
          offset,
        });
        const groupedStock = result.reduce((grouped, item) => {
          const { productId, quantity, warehouseId, id } = item;
          if (!grouped[productId]) {
            grouped[productId] = {
              id,
              productId,
              totalQuantity: 0,
              product: item.product,
              warehouse: item.warehouse,
            };
          }
          grouped[productId].totalQuantity += quantity;
          return grouped;
        }, {});
        stockSummary = result.map((item) => groupedStock[item.productId]);
        total = await stock.count({
          include: [{ model: product, where: filter }, { model: warehouse }],
          where: { warehouseId: checkAdmin.warehouseId },
        });
      }
      res.status(200).send({
        status: true,
        totalpage: Math.ceil(total / limit),
        currentpage: page,
        total_products: total,
        result: stockSummary,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        status: false,
        message: error.message,
      });
    }
  },
  updateStock: async (req, res) => {
    try {
        const { description, quantity, warehouseId, productId, stockId } = req.body
        
        const isAdmin = await user.findOne({ where: { id: req.user.id } })
        if (isAdmin.roleId === 1) throw { message: "Only admin can manage product stock data" }

        const stockInfo = await stock.findOne({
            where: { warehouseId, productId }
        })
        const prevQty = stockInfo.quantity
        const result = await stock.update({ quantity: prevQty + quantity }, {
            where: { warehouseId, productId }
        })
        const report = await journal.create({ stockId, description, quantity})

        res.status(200).send({
            status: true,
            result,
            report
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: false,
            message: error.message
        })
    }
},
  getProductStock: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await stock.sum("quantity", {
        where: { productId: id, isDeleted: false },
      });

      res.status(200).send({
        status: true,
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        status: false,
        message: error.message,
      });
    }
  },
  getWarehouseJournal: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await journal.findAll({
        include: [
          { model: stock, where: { isDeleted: false, warehouseId: id } },
        ],
      });
      res.status(200).send({
        status: true,
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        status: false,
        message: error.message,
      });
    }
  },
  getStock: async (req, res) => {
    const id = req.params.id; 
    try {
      const productStock = await product.findOne({
        where: { id: id }, 
        attributes: ["id", "name"],
        include: [
          {
            model: stock,
            where:{isDeleted:false},
            attributes: [
              [
                db.sequelize.fn("SUM", db.sequelize.col("quantity")),
                "totalStock",
              ],
            ],
          },
        ],
        group: ["product.id", "product.name"],
      });

      if (!productStock) {
        return res.status(404).send({
          status: false,
          message: "Product not found",
        });
      }

      res.status(200).send({
        status: true,
        message: `Total stock of product with ID ${id}`,
        result: productStock,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: false,
        message: "Error retrieving total stock",
        error: error.message,
      });
    }
  },
};
