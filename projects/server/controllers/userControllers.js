const {user,address,userAddress,role} = require("../models")
const {Op} = require("sequelize")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    getUserProfile: async (req, res) => {
        try {
            const id = req.params.id
            const result = await userAddress.findAll({where:{userId:id},
            include: [{model: address},{model: user}]
            });
            res.status(200).send({
                status: true,
                message: 'All of your address',
                result,
            });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },
    getUser: async (req, res) => {
        try {
            const page = +req.query.page || 1; 
            const limit = +req.query.limit || 5; 
            const roleId = +req.query.roleId || ""
            const search = req.query.search ||""
            const sort = req.query.sort || "asc";

            const condition = {
                isDeleted: false
            };
            let order = [];
            if (sort === "A-Z") {
                order.push(["name", "ASC"]);
            } else if (sort === "Z-A") {
                order.push(["name", "DESC"]);
            } else if (sort === "newest") {
                order.push(["createdAt", "DESC"]);
            } else if (sort === "oldest") {
                order.push(["createdAt", "ASC"]);
            }
            if (roleId) {
                condition.roleId = roleId;
            }
            if (search) {
                condition[Op.or] = [
                    {
                        name: {
                            [Op.like]: `%${search}%`,
                        },  
                    },
                ];
            }
            const offset = (page - 1) * limit;
            const total = await user.count({ where: condition });
            const result = await user.findAll({
                limit: limit,
                offset: offset,
                where: condition,
                order
            });
            res.status(200).send({
                status: true,
                message: 'All users retrieved',
                totalPage: Math.ceil(total / limit),
                currentPage: page,
                totalUser: total,
                result,
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