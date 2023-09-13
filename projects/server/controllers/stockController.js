const db = require("../models")
const product = db.product
const user = db.user
const journal = db.journal
const stock = db.stock
const warehouse = db.warehouse
const { Op } = require("sequelize");

module.exports = {
    getStockByWarehouse: async (req, res) => {
        try {
            const { id } = req.params
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 8;
            const offset = (page - 1) * limit;
            const category = +req.query.category || "";
            const name = req.query.name || "";
            const sort = req.query.sort || "";
            const search = req.query.search || "";

            const filter = { isDeleted: false, warehouseId: id };

            if (search) {
                filter[Op.or] = [{
                    name: {
                        [Op.like]: `%${search}%`,
                    },
                }];
            }
            if (category) { filter.categoryId = category; }
            if (name) {
                filter.name = {
                    [Op.iLike]: `%${name}%`
                };
            }
            let order = [];
            if (sort === "az") {
                order.push(["name", "ASC"]);
            } else if (sort === "za") {
                order.push(["name", "DESC"]);
            } else if (sort === "asc") {
                order.push(["price", "ASC"]);
            } else if (sort === "desc") {
                order.push(["price", "DESC"]);
            }
            const result = await stock.findAll({
                where: filter,
                include: [{
                    model: product,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted']},
                    where: { isDeleted: false }
                },{
                    model: warehouse,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted']},
                    where: { isDeleted: false }
                }],
                limit,
                offset,
                order
            })

            const total = await stock.count({ where: filter })
            res.status(200).send({
                status: true,
                totalpage: Math.ceil(total / limit),
                currentpage: page,
                total_products: total,
                result,
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
            const { id } = req.params

            const result = await stock.sum('quantity', {
                where: { productId: id, isDeleted: false } 
            })

            res.status(200).send({
                status: true,
                result
            })
        } catch (error) {
            console.log(error);
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    },
    addStock: async (req, res) => {
        try {
            const { productId, quantity, warehouseId} = req.body
            const isAdmin = await user.findOne({ where: { id: req.user.id}})
            if (isAdmin.roleId === 1 ) throw { message: "Only admin can manage stock data" }

            const [result] = await stock.findOrCreate({
                where: {
                    productId,
                    warehouseId
                }
            })
            if (!result.quantity) {
                await stock.update({ quantity: quantity }, {
                    where: {
                        id: result.id
                    }
                })
            } else {
                await stock.update({ quantity: quantity + result.quantity }, {
                    where: {
                        id: result.id
                    }
                })
            }

            res.status(200).send({
                status: true,
                result
            })
        } catch (error) {
            console.log(error);
            res.status(400).send({
                status: false,
                message: error.message
            })
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
    getWarehouseJournal: async (req, res) => {
        try {
            const { id } = req.params
            const result = await journal.findAll({
                include: [{ model: stock, where: { isDeleted: false, warehouseId: id } }]
            })
            res.status(200).send({
                status: true,
                result
            })
        } catch (error) {
            console.log(error);
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    },
    getStock: async (req, res) => {
        const id = req.params.id; // Assuming you pass the product ID in the request parameters
        
        try {
          // Query the database to get the total stock of the specified product by ID
          const productStock = await product.findOne({
            where: { id: id }, // Filter by product ID
            attributes: ["id", "name"],
            include: [
              {
                model: stock,
                attributes: [
                  [db.sequelize.fn("SUM", db.sequelize.col("quantity")), "totalStock"],
                ],
              },
            ],
            group: ["product.id", "product.name"],
          });
      
          if (!productStock) {
            // Product with the specified ID was not found
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
}