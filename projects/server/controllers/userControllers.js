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
            const condition = {isDeleted:false}
    
            const offset = (page - 1) * limit;
            const total = await user.count({where:condition})
            const result = await user.findAll({
                limit: limit,
                offset: offset,
                where:condition
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