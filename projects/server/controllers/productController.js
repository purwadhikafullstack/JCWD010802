const db = require("../models")
const product = db.product
const user = db.user
const categories = db.category
const { Op } = require("sequelize");

module.exports = {
    allProduct: async (req, res) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const offset = (page - 1) * limit;
            const search = req.query.search || "";
            const category = +req.query.category || null;
            const sort = req.query.sort || "az";
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
                    "isActive",
                    "weight"
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
            const { id } = req.params
            let productImg;
            const catLike = await categories.findOne({
                where: {
                    id: categoryId
                }
            })
            const findProduct = await product.findOne({ where: { id } })
            
            if (!catLike) {
                return res.status(400).send({
                    message: 'Category not found'
                })
            };

            if (req.file) {
                productImg = req.file.filename
            } else {
                productImg = findProduct.productImg
            }
            
            const result = await product.update({
                name,
                price,
                weight,
                description,
                categoryId: catLike.id,
                productImg,
            }, {
                where: { id }
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
            const isAdmin = await user.findOne({ where: { id: req.user.id }})
            if (isAdmin.roleId !== 3) throw { message: "Only admin can edit product" }
            const result = await product.findOne({ where: { id } })
            if (result.isDeleted) throw { message: "Product already deleted" }
            const update = await product.update({ isDeleted: true }, {
                where: { id }
            })
            res.status(200).send({
                message: "Delete product success",
                status: true,
                result: update
            })
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
                },
                include: [{ model: categories }]
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
    activateProduct: async (req, res) => {
        try {
            const { id } = req.params
            const isAdmin = await user.findOne({ where: { id: req.user.id }})
            if (isAdmin.roleId !== 3) throw { message: "Only admin can activate product" }
            const result = await product.findOne({ where: { id } })
            if (result.isActive) {
                const update = await product.update({ isActive: false }, {
                    where: { id }
                })
                res.status(200).send({
                    status: true,
                    message: "Product deactivated",
                    result: update
                })
            } else {
                const update = await product.update({ isActive: true }, {
                    where: { id }
                })
                res.status(200).send({
                    status: true,
                    message: "Product activated",
                    result: update
                })

            }
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },
}