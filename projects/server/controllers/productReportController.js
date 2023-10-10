const { Sequelize, Op } = require("sequelize");
const { journal, stock, product, warehouseAdmin, warehouse } = require("../models");

module.exports = {
    getStockHistory: async (req, res) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const offset = (page - 1) * limit;
            const sort = req.query.sort || "desc";
            const search = req.query.search || "";
            const warehouseId = +req.query.warehouseId || null;
            const today = new Date();
            const defaultMonthly = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
            const monthly = req.query.monthly || defaultMonthly;
            const productName = {
                name: {
                    [Sequelize.Op.like]: `%${search}%`,
                },
            };
            const stockCondition = {
                warehouseId: warehouseId !== null ?
                    warehouseId :
                    {
                        [Sequelize.Op.ne]: null,
                    },
            };
            const dateFilter = {};
            if (monthly) {
                const [year, month] = monthly.split("-");
                if (year && month) {
                    dateFilter["$journal.createdAt$"] = {
                        [Sequelize.Op.gte]: new Date(year, month - 1, 1),
                        [Sequelize.Op.lt]: new Date(year, month, 1),
                    };
                }
            }
            const isAdmin = await warehouseAdmin.findOne({
                where: {
                    userId: req.user.id,
                },
            });
            let result;
            if (isAdmin) {
                result = await journal.findAll({
                    include: {
                        model: stock,
                        where: { warehouseId: isAdmin.warehouseId },
                        include: {
                            model: product,
                            where: {
                                [Sequelize.Op.and]: [
                                    {
                                        isDeleted: false,
                                    },
                                    productName,
                                ],
                            },
                        },
                    },
                    where: {
                        ...dateFilter,
                    },
                    order: [["createdAt", sort]],
                    limit,
                    offset,
                });
            } else {
                result = await journal.findAll({
                    include: {
                        model: stock,
                        where: {
                            ...stockCondition,
                        },
                        include: [{
                            model: product,
                            where: {
                                [Sequelize.Op.and]: [
                                    {
                                        isDeleted: false,
                                    },
                                    productName,
                                ],
                            },
                        },
                        {model: warehouse}
                    ],
                    },
                    where: {
                        ...dateFilter,
                    },
                    order: [["createdAt", sort]],
                    limit,
                    offset,
                });
            }
            const total = await journal.count({
                include: {
                    model: stock,
                    where: {
                        ...stockCondition,
                    },
                },
                where: {
                    ...dateFilter,
                },
            });
            res.status(200).send({
                result,
                total,
                totalpage: Math.ceil(total / limit),
                currentpage: page,
                stock_history: total,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                status: false,
                message: err.message,
            });
        }
    },
    getReportProduct: async (req, res) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const offset = (page - 1) * limit;
            const sort = req.query.sort || "desc";
            const search = req.query.search || "";
            const warehouseId = +req.query.warehouseId || null;
            const today = new Date();
            const defaultMonthly = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
            const monthly = req.query.monthly || defaultMonthly;
    
            const productName = {
                name: {
                    [Sequelize.Op.like]: `%${search}%`,
                },
            };
            const stockCondition = {
                warehouseId: warehouseId !== null ?
                    warehouseId :
                    {
                        [Sequelize.Op.ne]: null,
                    },
            };
            const dateFilter = {};
            let startDate, endDate;
            if (monthly) {
                const [year, month] = monthly.split("-");
                if (year && month) {
                    startDate = new Date(year, month - 1, 1);
                    endDate = new Date(year, month, 0);
                    dateFilter["$journal.createdAt$"] = {
                        [Sequelize.Op.gte]: startDate,
                        [Sequelize.Op.lte]: endDate,
                    };
                }
            }
    
            const isAdmin = await warehouseAdmin.findOne({
                where: {
                    userId: req.user.id,
                },
            });
    
            let results;
    
            if (isAdmin) {
                results = await journal.findAll({
                    include: {
                        model: stock,
                        where: {
                            warehouseId: isAdmin.warehouseId,
                        },
                        include: [
                            {
                                model: product,
                                where: {
                                    [Sequelize.Op.and]: [
                                        {
                                            isDeleted: false,
                                        },
                                        productName,
                                    ],
                                },
                            },
                            {
                                model: warehouse, // Include the warehouse model
                                attributes: ['id', 'name'], // Adjust the attributes as needed
                            },
                        ],
                    },
                    where: {
                        ...dateFilter,
                    },
                    order: [
                        ["createdAt", sort]
                    ],
                    limit,
                    offset,
                });
            } else {
                results = await journal.findAll({
                    include: {
                        model: stock,
                        where: stockCondition,
                        include: [
                            {
                                model: product,
                                where: {
                                    [Sequelize.Op.and]: [
                                        {
                                            isDeleted: false,
                                        },
                                        productName,
                                    ],
                                },
                            },
                            {
                                model: warehouse, // Include the warehouse model
                                attributes: ['id', 'name'], // Adjust the attributes as needed
                            },
                        ],
                    },
                    where: {
                        ...dateFilter,
                    },
                    order: [
                        ["createdAt", sort]
                    ],
                    limit,
                    offset,
                });
            }
    
            const filteredResults = monthly ? results.filter((result) => {
                const updatedAt = new Date(result.updatedAt || result.createdAt);
                return updatedAt >= startDate && updatedAt <= endDate;
            }) : results;
    
            const productTotals = {};
            filteredResults.forEach((result) => {
                const productName = result.stock.product.name;
                const description = result.description;
                const quantity = result.quantity;
                if (!productTotals[productName]) {
                    productTotals[productName] = {
                        tambah: 0,
                        kurang: 0,
                        quantity: 0,
                        latestUpdatedAt: null,
                    };
                }
                if (description === "tambah") {
                    productTotals[productName].tambah += quantity;
                } else if (description === "kurang") {
                    productTotals[productName].kurang += quantity;
                }
                productTotals[productName].quantity = result.stock.quantity;
                const updatedAt = new Date(result.updatedAt || result.createdAt);
                if (
                    !productTotals[productName].latestUpdatedAt ||
                    updatedAt > productTotals[productName].latestUpdatedAt
                ) {
                    productTotals[productName].latestUpdatedAt = updatedAt;
                }
            });
    
            const groupedResults = [];
            filteredResults.forEach((result) => {
                const productName = result.stock.product.name;
                const productEntry = groupedResults.find(
                    (entry) => entry.productName === productName
                );
                if (productEntry) {
                    productEntry.entries.push(result);
                } else {
                    groupedResults.push({
                        productName,
                        entries: [result],
                    });
                }
            });
    
            groupedResults.forEach((result) => {
                result.entries.sort(
                    (a, b) =>
                    new Date(b.updatedAt || b.createdAt) -
                    new Date(a.updatedAt || a.createdAt)
                );
            });
    
            groupedResults.forEach((result) => {
                const productName = result.productName;
                result.totals = productTotals[productName];
            });
    
            const total = await journal.count({
                include: {
                    model: stock,
                    where: stockCondition,
                },
                where: dateFilter,
            });
    
            res.status(200).send({
                groupedResults,
                totalpage: Math.ceil(total / limit),
                currentpage: page,
                stock_history: total,
            });
        } catch (err) {
            res.status(400).send({
                status: false,
                message: err.message,
            });
        }
    },
    
};