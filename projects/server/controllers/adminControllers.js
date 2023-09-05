const {user, warehouseAdmin,warehouse,address} =require("../models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports = {
    addAdmin : async(req,res) => {
        try {
            const { name, email } = req.body;
            const result = await user.create({
              name,
              email,
              roleId:2
            });
            const {warehouse} = req.body
            const gudang = await warehouseAdmin.create({
              userId:result.id,
              warehouseId:warehouse
            })
            res.status(200).send({
              status: true,
              message: "Add new Warehouse Admin success",
              result,
              gudang
            });
          } catch (error) {
            res.status(400).send(error);
            console.log(error);
          }
},

getAdmin: async (req,res) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 5;
    const offset = (page - 1) * limit
    const total = await user.count({  where:{roleId:2, isDeleted:false}})
    const result = await user.findAll({  where:{roleId:2, isDeleted:false},limit, offset:offset} )
    res.status(200).send({
      totalPage: Math.ceil(total / limit),
      currentPage: page,
      totalAdmin: total,
      result,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
},

getAdminProfile: async (req,res) => {
    try {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 5;
      const offset = (page - 1) * limit
      const warehouseId = +req.query.warehouseId || ""

      const condition = {}
      if (warehouseId) {
        condition.warehouseId = warehouseId;
      }
      const total = await warehouseAdmin.count({where:condition})
    
      const result = await warehouseAdmin.findAll({ limit, offset:offset ,where:condition,  include: [{model: warehouse,include:[{model:address}]},{model: user,where:{isDeleted:false}}]})
      res.status(200).send({
        totalPage: Math.ceil(total / limit),
        currentPage: page,
        totalAdmin: total,
        result,
        status: true,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  deleteAdmin : async (req,res)=>{
    try {
      const id = req.params.id
        const result = await user.findOne(
          {where:
            {id:id}
          }
        )
        await user.update(
            {isDeleted : true},
            {where:{id:id}}
            )
            res.status(200).send("Admin has been deleted")
          
    } catch (error) {
        res.status(400).send("Failed")
        console.log(error);
    }
  },
  changeAdminWarehouse : async (req,res)=>{
    try {
      const id = req.params.id
      const {warehouse} = req.body
        const result = await warehouseAdmin.findOne(
          {where:
            {userId:id}
          }
        )
        await warehouseAdmin.update(
            {warehouseId : warehouse},
            {where:{userId:id}}
            )
            res.status(200).send("Warehouse has been change!")
          
    } catch (error) {
        res.status(400).send("Failed")
        console.log(error);
    }
  },
  editAdmin: async (req, res) => {
    try {
        const id = req.params.id;
        const updateFields = {};
      
        
        if (req.body.name) {
            updateFields.name = req.body.name;
        }
        
        if (req.body.email) {
            updateFields.email = req.body.email;
        }
      
        console.log(id);
        const result = await user.update(updateFields, {
            where: { id: id }
        });
        
        console.log(updateFields);
        res.status(200).send({ msg: "Success to edit admin" ,result});
    } catch (error) {
        console.error(error);
        res.status(400).send({ error, msg: "Failed to edit admin" });
    }
},

}