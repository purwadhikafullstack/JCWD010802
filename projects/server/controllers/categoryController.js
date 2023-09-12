const { Sequelize, Op } = require('sequelize');
const db = require('../models');
const category = db.category;
const product = db.product;

module.exports = {
    allCategory: async (req, res) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 5;
            const offset = (page - 1) * limit;
            const search = req.query.search || "";
            const sort = req.query.sort || "";
    
            const filter = {
                isDeleted: false,
            };
            if (search) {
                filter[Op.or] = [
                    {
                        name: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                ];
            }
            const totalProduct = await product.findAll({
                where: filter,
                group: "CategoryId",
                attributes: [
                    "CategoryId",
                    [Sequelize.fn("count", Sequelize.col("id")), "total"],
                ],
            });
            const total = await category.count({
                where: filter,
            });
            if (sort === "asc") {
                result = await category.findAll({
                    where: filter,
                    order: [["name", "ASC"]],
                    limit,
                    offset,
                });
            } else if (sort === "desc") {
                result = await category.findAll({
                    where: filter,
                    order: [["name", "DESC"]],
                    limit,
                    offset,
                });
            } else {
                result = await category.findAll({
                    where: filter,
                    limit,
                    offset,
                });
            }
            res.status(200).send({
                totalpage: Math.ceil(total / limit),
                currentpage: page,
                all_category: total,
                totalProduct,
                result,
                status: true,
            });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message,
            });
        }
    },    
    createCategory : async (req, res) => {
        try {
            const name = req.body.name;
            const categoryImg = req.file.filename
            const isCatExist = await category.findOne({ where : { name:name }});
            if (isCatExist) throw {message : "Category has already been created"}
            const result = await category.create({name,categoryImg})
            res.status(201).send({
                msg: "Success to create new category",
                status: true,
                result
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
            const { id } = req.params;
            const { name } = req.body;
            const updateData = {};

            if (name !== undefined) {
                updateData.name = name;
            }
            if (req.file && req.file.filename) {
                updateData.categoryImg = req.file.filename;
            }
            
            if (Object.keys(updateData).length === 0) {
                return res.status(400).send({
                    status: false,
                    message: "No valid data provided for update.",
                });
            }
    
            await category.update(updateData, { where: { id } });
    
            res.status(200).send({
                msg: "Category has been updated successfully",
                status: true,
            });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message,
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