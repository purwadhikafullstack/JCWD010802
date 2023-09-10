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
    }
}