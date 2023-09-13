const db = require("../models")
const product = db.product
const user = db.user
const categories = db.category
const stock = db.stock
const { Op } = require("sequelize");

module.exports = {
    stockChange: async (req, res) => {
        try {
            const { stock } = req.body
        } catch (error) {
            console.log(error);
            res.status(400).send({
                status: false,
                message: err.message
            });
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