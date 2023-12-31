const { Op,Sequelize } = require("sequelize");
const { order, address, journal, stock, product, warehouse, stockMutation, requestHistory, cartItem, sequelize } = require("../models");
const calculateDistance = require('../utils/calculateDistance');

module.exports = {
  manualRequest: async (req, res) => {
    try {
      const { fromWarehouseId, toWarehouseId, productId, quantity } = req.body;

      const warehouses = await warehouse.findAll({ include: { model: address } });
      const fromWarehouse = await warehouse.findOne({ where: { id: fromWarehouseId }, include: { model: address } });
      const toWarehouse = await warehouse.findOne({ where: { id: toWarehouseId }, include: { model: address } });

      if (!fromWarehouse || !toWarehouse) {
        return res.status(404).send('One or both warehouses not found.');
      }

      const sourceStock = await stock.findOne({
        where: { productId, warehouseId: fromWarehouseId },
      });

      if (!sourceStock) {
        return res.status(404).send('Source stock not found.');
      }

      if (sourceStock.quantity < quantity) {
        return res.status(400).send('Insufficient stock for the requested quantity.');
      }

      const stockMutations = await stockMutation.create({
        stockId: sourceStock.id,
        type: 'manual',
        quantity,
      });

      const reqHistory = await requestHistory.create({
        status: 'requested',
        from: fromWarehouseId,
        from_name: fromWarehouse.name,
        to: toWarehouseId,
        to_name: toWarehouse.name,
        stockId: sourceStock.id,
        quantity,
      });


    res.status(201).send({message: 'Manual stock mutation request created successfully'});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  },
  superAdminRequest : async(req,res) =>{
    try {
      const manualRequests = await requestHistory.findAll({where: { status: 'requested'},include:[{model:stock, include:{model:product}}]});
      res.status(200).send(manualRequests)
    } catch (error) {
      console.log(error);
    }
  },allSuperRequest : async (req, res) => {
    try {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 5;
      const offset = (page - 1) * limit;
      const status = req.query.status || '';
      const sortDir = req.query.sortDir || 'asc';
      const productName = req.query.productName || '';
      const dateFilter = req.query.dateFilter || 'all'; 

      const whereClause = {}
      const productFilter = {}
  
      if (status) {
        whereClause.status = status;
      }
      if (productName) {
        productFilter.productId= productName;
      }
      if (dateFilter === 'last7') {
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);
  
        whereClause.createdAt = {
          [Sequelize.Op.gte]: last7Days,
        };
      } else if (dateFilter === 'today') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
  
        whereClause.createdAt = {
          [Sequelize.Op.gte]: today,
          [Sequelize.Op.lte]: new Date()}
      } else if (dateFilter === 'last30') {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
  
        whereClause.createdAt = {
          [Sequelize.Op.gte]: last30Days,
        };
      }
      const order = [['createdAt', sortDir]]; 
  
      const manualRequests = await requestHistory.findAll({
        include: [{ model: stock ,where : productFilter, include: { model: product  } }],
        offset,
        limit, 
        order,
        where: whereClause,
      });
  
      const total = await requestHistory.count({
        include: [{ model: stock ,where : productFilter, include: { model: product  } }],
        where: whereClause,
      });
  
      res.status(200).send({
        totalpage: Math.ceil(total / limit),
        currentpage: page,
        total_requests: total,
        result: manualRequests,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },
    rejectRequest: async(req,res)=>{
      try {
        const { id } = req.params;
  
        const request = await requestHistory.findOne({ where: { id: id } });
  
        if (!request) {
          return res.status(404).send('Request not found.');
        }
  
        await request.update({ status: 'rejected' });
  
        res.status(200).send({ message: 'Manual request rejected successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
    },
  incomingRequest : async(req,res) =>{
    try {
      const {id} = req.params
      const manualRequests = await requestHistory.findAll({where: { status: 'requested', from:id},include:[{model:stock, include:{model:product}}]});
      res.status(200).send(manualRequests)
    } catch (error) {
      console.log(error);
    }
  },

allRequest : async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 5;
    const offset = (page - 1) * limit;
    const { id } = req.params;
    const status = req.query.status || '';
    const sortDir = req.query.sortDir || 'asc';
    const productName = req.query.productName || '';
    const dateFilter = req.query.dateFilter || 'all'; 


    const whereClause = {
      [Op.or]: [{ to: id }, { from: id }],
    };

    if (status) {
      whereClause.status = status;
    }
    const productFilter = {}
  
      if (status) {
        whereClause.status = status;
      }
      if (productName) {
        productFilter.productId= productName;
      }
      if (dateFilter === 'last7') {
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);
  
        whereClause.createdAt = {
          [Sequelize.Op.gte]: last7Days,
        };
      } else if (dateFilter === 'today') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
  
        whereClause.createdAt = {
          [Sequelize.Op.gte]: today,
          [Sequelize.Op.lte]: new Date()}
      } else if (dateFilter === 'last30') {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
  
        whereClause.createdAt = {
          [Sequelize.Op.gte]: last30Days,
        };
      }
      const order = [['createdAt', sortDir]]; 
  
      const manualRequests = await requestHistory.findAll({
        include: [{ model: stock ,where : productFilter, include: { model: product  } }],
        offset,
        limit, 
        order,
        where: whereClause,
      });
  
      const total = await requestHistory.count({
        include: [{ model: stock ,where : productFilter, include: { model: product  } }],
        where: whereClause,
      });
    res.status(200).send({
      totalpage: Math.ceil(total / limit),
      currentpage: page,
      total_requests: total,
      result: manualRequests,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
},
  rejectRequest: async(req,res)=>{
    try {
      const { id } = req.params;

      const request = await requestHistory.findOne({ where: { id: id } });

      if (!request) {
        return res.status(404).send('Request not found.');
      }

      await request.update({ status: 'rejected' });

      res.status(200).send({ message: 'Manual request rejected successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  },
  acceptRequest: async (req, res) => {
    try {
      const { id } = req.params;
      const findRequest = await requestHistory.findOne({
        where: { id: id },
        include: [{ model: stock, include: { model: product } }],
      });
  console.log(id);
      if (!findRequest) {
        return res.status(404).send("Request not found");
      }
  
      const fromWarehouse = await warehouse.findOne({ where: { id: findRequest.from } });
      const toWarehouse = await warehouse.findOne({ where: { id: findRequest.to } });
      const fromStock = await stock.findOne({ where: { id: findRequest.stock.id } });
      const toStock = await stock.findOne({
        where: {
          warehouseId: toWarehouse.id,
          productId: findRequest.stock.productId,
        },
      });
      if (fromStock.quantity < findRequest.quantity) {
        return res.status(400).send("Insufficient quantity in source stock");
      }
      const updatedToStockQuantity = toStock.quantity + findRequest.quantity;
      const updatedFromStockQuantity = fromStock.quantity - findRequest.quantity;
      await sequelize.transaction(async (t) => {
        await toStock.update({ quantity: updatedToStockQuantity }, { transaction: t });
        await fromStock.update({ quantity: updatedFromStockQuantity }, { transaction: t });
        await findRequest.update({ status: "accepted" }, { transaction: t });
        await  journal.create({
          description: "reduce",
          quantity: -findRequest.quantity,
          stockId: fromStock.id,
          requestHistoryId: id
         },{transaction:t});
         await journal.create({
          description: "add",
          quantity: findRequest.quantity,
          stockId: toStock.id,
          requestHistoryId: id
         },{transaction:t})
      });
      res.status(200).send({status:true, message:"Stock Mutation success"});
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  },
  
};

