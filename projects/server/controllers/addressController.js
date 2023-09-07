const db = require('../models'); 
const userAddresses = db.userAddress;
const addresses = db.address;
const user = db.user;
const axios = require('axios');
const { Op, Sequelize } = require('sequelize');
require('dotenv').config()


module.exports = {
    addAddress: async (req, res) => {
        try {
            const { address, kota, provinsi, kode_pos } = req.body;
            const city = await axios.get(`https://api.rajaongkir.com/starter/city?id=${kota}&province=${provinsi}`,{
                headers: {key: process.env.KEY_RAJAONGKIR}
            })
            const query = `${address}, ${city.data.rajaongkir.results.city_name}, ${city.data.rajaongkir.results.province}, Indonesia`;
            const apiKey = '16bd3857ad1044dcbb247e689b5e4606';
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}`);
            if (response.status === 200 && response.data.results.length > 0) {
                const { lat, lng } = response.data.results[0].geometry;
                const result = await addresses.create({ address, kota, provinsi, kode_pos, lat, lng: lng });
                const primary = await userAddresses.findOne({where: {userId:req.user.id,isPrimary: true}})
                if (!primary) {
                    await userAddresses.create({userId:req.user.id,addressId:result.id})
                }
                else {
                    await userAddresses.create({userId:req.user.id,addressId:result.id,isPrimary:false})
                }
                res.status(200).send({
                    status: true,
                    message: 'Success to add address',
                    result,
                });
            } else {
                res.status(400).send({
                    status: false,
                    message: 'Failed to geocode the address',
                });
            }
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message,
            });
        }
    },
    getAddress: async (req, res) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 5;
            const offset = (page - 1) * limit;
            const sort = req.query.sort || "desc"; 
            const search = req.query.search || ""; 
    
            const filter = {
                isDeleted: false,
                userId : req.user.id
            };
    
            if (search) {
                filter[Op.and] = Sequelize.literal(`address.address LIKE '%${search}%' AND userAddress.isDeleted = false`);
            }
    
            let order = [];
            if (sort === "asc") {
                order.push(["isPrimary", "ASC"]);
            } else if (sort === "desc") {
                order.push(["isPrimary", "DESC"]); 
            }
    
            const total = await userAddresses.count({
                where: filter,
                include: [{ model: addresses, as: 'address' }, { model: user }],
            });
            const result = await userAddresses.findAll({
                where: filter,
                include: [{ model: addresses, as: 'address' }, { model: user }],
                limit,
                offset,
                order,
            });
            res.status(200).send({
                totalpage: Math.ceil(total / limit),
                currentpage: page,
                total_address: total,
                result,
                status: true,
                message: 'All of your addresses',
                total
            });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },    
    updateAddress: async (req, res) => {
        try {
            const { address, kota, provinsi, kode_pos } = req.body;
            const { id } = req.params
            const city = await axios.get(`https://api.rajaongkir.com/starter/city?id=${kota}&province=${provinsi}`,{
                headers: {key: process.env.KEY_RAJAONGKIR}
            })
            const query = `${address}, ${city.data.rajaongkir.results.city_name}, ${city.data.rajaongkir.results.province}, Indonesia`;
            const apiKey = '16bd3857ad1044dcbb247e689b5e4606';
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}`);
            if (response.status === 200 && response.data.results.length > 0) {
                const { lat, lng } = response.data.results[0].geometry;
                const result = await addresses.update({ address, kota, provinsi, kode_pos, lat, lng: lng },{where : { id }});
                res.status(200).send({
                    status: true,
                    message: 'Success to update your address',
                    result,
                });
            } else {
                res.status(400).send({
                    status: false,
                    message: 'Failed to geocode the address',
                });
            }
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message,
            });
        }
    },
    deleteAddress: async (req, res) => {
        try {
            const id = req.params.id
            const addressExist = await userAddresses.findOne({where:{id:id,isDeleted:false}})
            if (!addressExist) {
                throw {message: "Your address not found"}
            } 
                await userAddresses.update({isDeleted : true},
                    {where:{id:id}});
                res.status(200).send({
                    status: true,
                    message: 'Success delete your address',
                });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },
    primaryAddress: async (req, res) => {
        try {
            const id = req.params.id
            const bePrimary = await userAddresses.findOne({where:{isPrimary:true}})
            if (bePrimary) {
                await userAddresses.update({isPrimary : false},{where: {userId:req.user.id}})
            }
                await userAddresses.update({isPrimary : true},{where: {addressId:id,userId:req.user.id}})
                res.status(200).send({
                    status: true,
                    message: 'Success change primary',
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