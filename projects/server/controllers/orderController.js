const { Op } = require("sequelize");
const { order, orderItem, user, status, product } = require("../models")

module.exports = {
    allOrder: async (req, res) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const offset = (page - 1) * limit;
            const search = req.query.search || "";
            const sort = req.query.sort || "asc";

            const filter = {};
            if (search) {
                filter[Op.or] = [
                    { name: { [Op.like]: `%${search}%`, }, },];
            }
            const isUserExist = await user.findOne({
                where: { id: req.user.id }
            })
            if (!isUserExist) throw { message: "User not found!" }
            const result = await order.findAll({
                where: { userId: req.user.id },
                attributes: { exclude: ['updatedAt'] },
                include: [
                    { model: orderItem, attributes: { exclude: ['createdAt', 'updatedAt'] }, 
                    include: [ { model: product, attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted', 'isActive']}, where: filter}] },
                    { model: status }
                ],
                limit,
                offset,
                sort
            })
            const total = await order.count({ where: { userId: req.user.id }})
            
            res.status(200).send({
                totalpage: Math.ceil(total / limit),
                currentpage: page,
                total_order: total,
                result,
                status: true,
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    },
    uploadPayment: async (req, res) => {
        try {
            const paymentImg = req.file.filename
            const { id } = req.params

            const isOrderExist = await order.findOne({ where: { id } })
            if (!isOrderExist) throw { message: "Order not found!" }
            if (isOrderExist.userId !== req.user.id) throw { message: "Invalid account" }
            if (isOrderExist.paymentProof) throw { message: "Order already paid" }
            const result = await order.update({ paymentProof: paymentImg }, {
                where: { id, userId: req.user.id }
            })
            res.status(200).send({
                result,
                status: true,
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    },
    cancelOrder: async (req, res) => {
        try {
            const { id } = req.params
            const isOrderExist = await order.findOne({ where: { id }})
            if (!isOrderExist) throw { message: "Order not found!" }
            if (isOrderExist.userId !== req.user.id) throw { message: "Invalid account" }
            if (isOrderExist.paymentProof) throw { message: "Cannot cancel your order" }
            const result = await order.update({ statusId: 6 }, {
                where: { id, userId: req.user.id }
            })
            res.status(200).send({
                status: true,
                message: "Order canceled!",
                result,
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    },
    confirmOrder: async (req, res) => {
        try {
            const { id } = req.params
            const isOrderExist = await order.findOne({ where: { id }})
            if (!isOrderExist) throw { message: "Order not found!" }
            if (isOrderExist.userId !== req.user.id) throw { message: "Invalid account" }
            if (isOrderExist.statusId < 4) throw { message: "Your order still in process"}
            if (isOrderExist.statusId === 6) throw { message: "Your order is canceled"}
            const result = await order.update({ statusId: 5 }, {
                where: { id, userId: req.user.id }
            })
            res.status(200).send({
                status: true,
                message: "Your order is completed!",
                result,
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    }
}