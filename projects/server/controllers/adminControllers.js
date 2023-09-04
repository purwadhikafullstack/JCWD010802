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
    const limit = +req.query.limit || 10;
    const offset = (page - 1) * limit
    const total = await user.count()
    const result = await user.findAll({  where:{roleId:2},limit, offset:offset} )
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
      const total = await warehouseAdmin.count()
      const result = await warehouseAdmin.findAll({ limit, offset:offset,  include: [{model: warehouse,include:[{model:address}]},{model: user,where:{isDeleted:false}}]})
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

}