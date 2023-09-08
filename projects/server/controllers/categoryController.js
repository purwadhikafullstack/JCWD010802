const { Sequelize } = require('sequelize');
const db = require('../models');
const category = db.category;
const product = db.product;


module.exports = {
    allCategory: async (req, res) => {
        try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        const filter = {
            isDeleted: false, 
        };
        const totalProduct = await product.findAll({
            where: filter,
            group: "CategoryId",
            attributes : [
                "CategoryId",
                [Sequelize.fn("count", Sequelize.col("id")), "total"]
            ]
        });
        const total = await category.count({
            where: filter,
        });
        const result = await category.findAll({
            attributes: [
                "id",
                "name",
            ],
            where: filter,
            limit,
            offset
        });
        res.status(200).send({
            totalpage: Math.ceil(total / limit),
            currentpage: page,
            all_category: total,
            totalProduct,
            result,
            status: true
        });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },
    createCategory : async (req, res) => {
        try {
            const name = req.body.name;
            const result = await category.findOrCreate({ where : { name:name } });
            if (!result[1]) throw {message : "Category has already been created"}
            res.status(201).send({
                msg: "Success to create new category",
                status: true,
            });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { id } = req.params
            const name = req.body.name;
            await category.update({
                name:name,
            },{where: { id }});
            res.status(200).send({
                msg: "Category has been updated successfully",
                status: true,
            });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },
    deleteCategory : async(req, res) => {
        try {
            const { id } = req.params;
            await category.update(
            { isDeleted: true },
            { where: { id } });
            res.status(200).send({
                status: true,
                msg: 'Success deleted category!',
            })
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },
}