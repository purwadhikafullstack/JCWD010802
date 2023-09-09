const db = require('../models');
const product = db.product;
const categories = db.category
const {
    Op
} = require("sequelize");

module.exports = {
    allProduct: async (req, res) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const offset = (page - 1) * limit;
            const search = req.query.search || "";
            const category = +req.query.category || null;
            const sort = req.query.sort || "asc";
            const minPrice = +req.query.minPrice || 0;
            const maxPrice = +req.query.maxPrice || 9999999999;
    
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
    
            if (category !== null) {
                filter.categoryId = category;
            }
    
            filter.price = {
                [Op.between]: [minPrice, maxPrice],
            };
    
            let order = [];
            if (sort === "az") {
                order.push(["name", "ASC"]);
            } else if (sort === "za") {
                order.push(["name", "DESC"]);
            } else if (sort === "lowest") {
                order.push(["price", "ASC"]);
            } else if (sort === "highest") {
                order.push(["price", "DESC"]);
            }
    
            const total = await product.count({
                where: filter,
            });
            const result = await product.findAll({
                include: [
                    {
                        model: categories,
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "isDeleted"],
                        },
                        where: {
                            isDeleted: false,
                        },
                    },
                ],
                attributes: [
                    "id",
                    "name",
                    "description",
                    "price",
                    "productImg",
                    "categoryId",
                    "isDeleted",
                ],
                where: filter,
                limit,
                offset,
                order,
            });
            res.status(200).send({
                totalpage: Math.ceil(total / limit),
                currentpage: page,
                total_products: total,
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
    
    createProduct: async (req, res) => {
        try {
            const {
                name,
                price,
                categoryId,
                weight,
                description
            } = req.body;
            const productImg = req.file.filename
            const catLike = await categories.findOne({
                where: {
                    id: categoryId
                }
            })
            if (!catLike) {
                return res.status(400).send({
                    message: 'Category not found'
                })
            };
            if (req.file.size > 1024 * 1024) throw {
                status: false,
                message: "file size to large"
            }
            const result = await product.create({
                name,
                price,
                weight,
                description,
                categoryId: catLike.id,
                productImg,
            })
            res.status(201).send({
                msg: "Success to create new product",
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
    editProduct: async (req, res) => {
        try {
            const {
                name,
                price,
                categoryId,
                weight,
                description
            } = req.body;
            const {
                id
            } = req.params
            const productImg = req.file.filename
            const catLike = await categories.findOne({
                where: {
                    id: categoryId
                }
            })
            if (!catLike) {
                return res.status(400).send({
                    message: 'Category not found'
                })
            };
            const result = await product.update({
                name,
                price,
                weight,
                description,
                categoryId: catLike.id,
                productImg,
            }, {
                where: {
                    id
                }
            });
            res.status(200).send({
                msg: "Success update the product",
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
    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id
            const result = await product.findOne({
                where: {
                    id: id
                }
            })
            if (result.isDeleted == false) {
                await product.update({
                    isDeleted: true
                }, {
                    where: {
                        id: id
                    }
                })
                res.status(200).send("Success to delete product")
            }
            if (result.isDeleted == true) {
                await product.update({
                    isDeleted: false
                }, {
                    where: {
                        id: id
                    }
                })
                res.status(200).send("Success to activate product")
            }
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },
    detailProduct: async (req, res) => {
        try {
            const id = req.params.id
            const result = await product.findOne({
                where: {
                    id: id
                }
            })
            res.status(200).send({
                msg: "Here's the product",
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
}