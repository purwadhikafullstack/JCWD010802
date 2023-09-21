const { Sequelize, Op } = require('sequelize');
const { journal, stock, product } = require('../models');

module.exports = {
    getJournal: async (req, res) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 2;
            const offset = (page - 1) * limit;
            const sort = req.query.sort || "desc";
            const search = req.query.search || "";
            const warehouseId = +req.query.warehouseId || null; 
            const productName = {
                name: {
                    [Sequelize.Op.like]: `%${search}%`
                }
            };
            const stockCondition = {
                warehouseId: warehouseId !== null ? warehouseId : { [Op.ne]: null }
            };

            const result = await journal.findAll({
                include: {
                    model: stock,
                    include: {
                        model: product,
                        where: {
                            [Sequelize.Op.and]: [
                                { isDeleted: false },
                                productName
                            ]
                        }
                    },
                    where: stockCondition 
                },
                order: [['createdAt', sort]],
                limit,
                offset,
            });
            const total = await journal.count({
                include: {
                    model: stock,
                    where: stockCondition 
                }
            });
            res.status(200).send({
                result,
                totalpage: Math.ceil(total / limit),
                currentpage: page,
                stock_history: total,
            });
        } catch (err) {
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },
};
