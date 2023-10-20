const  axios  = require("axios");
const db = require("../models")
const addresses = db.address
const {warehouse,stock,product} = require("../models");

module.exports = {
    getWarehouse : async(req,res) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 3;
            const offset = (page - 1) * limit;
            const sort = req.query.sort || "desc"; 
            const search = req.query.search || ""; 
            const filter = {
                isDeleted: false,
            };
            const result = await warehouse.findAll({      where: filter,
                include: {model: addresses}, limit,
                offset,})
            const total = await warehouse.count({
                where: filter,
                include: {model: addresses}})
        res.status(200).send({result, 
        totalpage: Math.ceil(total / limit),
        currentpage: page,
        total_address: total,})
        } catch (error) {
            console.log(error);
        }
    },
    warehouseList : async(req,res) => {
        try {
            const filter = {
                isDeleted: false,
            };
            const result = await warehouse.findAll({where: filter,
                include: {model: addresses}})
        res.status(200).send(result)
        } catch (error) {
            console.log(error);
        }
    },
    addWarehouse: async (req, res) => {
        try {
            const { address, kota, provinsi, kode_pos, name } = req.body;
            const image=req.file.filename
            const city = await axios.get(`https://api.rajaongkir.com/starter/city?id=${kota}&province=${provinsi}`,{
                headers: {key: process.env.KEY_RAJAONGKIR}
            })
            const query = `${address}, ${city.data.rajaongkir.results.city_name}, ${city.data.rajaongkir.results.province}, Indonesia`;
            const apiKey = '16bd3857ad1044dcbb247e689b5e4606';
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}`);
            if (response.status === 200 && response.data.results.length > 0) {
                const { lat, lng } = response.data.results[0].geometry;
                const result = await addresses.create({ address, kota,nama_kota: city.data.rajaongkir.results.city_name, provinsi, nama_provinsi: city.data.rajaongkir.results.province, kode_pos, lat, lng: lng });
                const isWarehouseExist = await warehouse.findOne({ where: { name} })
                if (isWarehouseExist) throw { message: "Warehouse Name Must be Unique" }
                const newWarehouse = await warehouse.create({name, image:image, addressId:result.id })
                const allProduct = await product.findAll({ where: { isDeleted: false } })
                allProduct.forEach(async (item) => {
                await stock.create({
                    productId: item.id,
                    warehouseId: newWarehouse.id,
                    isDeleted: false,
                    quantity: 0
                })
            })
               
                res.status(200).send({
                    status: true,
                    message: 'Success to add address',
                    result,
                    newWarehouse
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
    updateWarehouse: async (req, res) => {
        try {
          const { id } = req.params;
          const gudang = await warehouse.findOne({ where: { id: id } });
      
          if (!gudang) {
            return res.status(404).send({
              status: false,
              message: 'Warehouse not found',
            });
          }
        
          const updatedData = {}; 
      
          if (req.body.address) {
            updatedData.address = req.body.address;
          }
      
          if (req.body.kota && req.body.provinsi) {
            const city = await axios.get(`https://api.rajaongkir.com/starter/city?id=${req.body.kota}&province=${req.body.provinsi}`, {
              headers: { key: process.env.KEY_RAJAONGKIR },
            });
            updatedData.kota = req.body.kota;
            updatedData.provinsi = req.body.provinsi;
            updatedData.nama_kota = city.data.rajaongkir.results.city_name;
            updatedData.nama_provinsi = city.data.rajaongkir.results.province;
          }
          
          if (req.body.kode_pos) {
            updatedData.kode_pos = req.body.kode_pos;
          }
          

          if (req.body.name && req.body.name !== gudang.name) {
            const gudangSamaNama = await warehouse.findOne({
                where: {
                    name: req.body.name
                }
            });

            if (gudangSamaNama && gudangSamaNama.id !== id) {
                return res.status(400).send({ message: "Warehouse name must be unique" });
            }

            updatedData.name = req.body.name;
        }
      
          if (req.file && req.file.filename) {
            updatedData.image = req.file.filename;
          }
      
          if (Object.keys(updatedData).length === 0) {
            return res.status(400).send({
              status: false,
              message: 'No data provided for update',
            });
          }
          if (Object.keys(updatedData).some(key => ['address', 'kota', 'provinsi', 'kode_pos'].includes(key))) {
            const query = `${updatedData.address}, ${updatedData.kotaName}, ${updatedData.provinsiName}, Indonesia`;
            const apiKey = '16bd3857ad1044dcbb247e689b5e4606';
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}`);
            
            if (response.status === 200 && response.data.results.length > 0) {
              const { lat, lng } = response.data.results[0].geometry;
      
              await addresses.update(
                { ...updatedData, lat, lng: lng },
                { where: { id: gudang.addressId } }
              );
            } else {
              return res.status(400).send({
                status: false,
                message: 'Failed to geocode the address',
              });
            }
          }
      
          if (Object.keys(updatedData).some(key => ['name', 'image'].includes(key))) {
            await warehouse.update(updatedData, { where: { id: id } });
          }
      
          res.status(200).send({
            status: true,
            message: 'Success to update your address',
            updatedData,
          });
        } catch (err) {
          console.error(err);
          res.status(400).send({
            status: false,
            message: err.message,
          });
        }
      },
      
    deleteWarehouse: async (req, res) => {
        try {
            const id = req.params.id
            const warehouseExist = await warehouse.findOne({where:{id:id,isDeleted:false}})
            if (!warehouseExist) {
                throw {message: "Your warehouse not found"}
            } 
                await warehouse.update({isDeleted : true},
                    {where:{id:id}});
                await  stock.update({isDeleted: true},{where:{warehouseId:id}})
                res.status(200).send({
                    status: true,
                    message: 'Success delete your warehouse',
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