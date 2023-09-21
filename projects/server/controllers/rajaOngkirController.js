const axios = require('axios');
require('dotenv').config()
const rajaOngkir = require("rajaongkir-nodejs").Starter(`${process.env.KEY_RAJAONGKIR}`);

module.exports = {
    getProvince: async (req, res) => {
        try {
            const response = await axios.get('https://api.rajaongkir.com/starter/province', {
                headers: {'key': process.env.KEY_RAJAONGKIR}
            });
            const provinceData = response.data; 
            res.status(200).send({
                status: true,
                message: 'All province',
                province: provinceData 
            });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },
    getCity: async (req, res) => {
        try {
            const response = await axios.get(`https://api.rajaongkir.com/starter/city`, {
                headers: {'key': process.env.KEY_RAJAONGKIR}
            });
            const cityData = response.data; 
            res.status(200).send({
                status: true,
                message: 'All city',
                city: cityData 
            });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },
    service: async (req, res) => {
        try {
            var params = {
                origin: req.body.origin,
                destination: req.body.destination,
                weight: req.body.weight
            };
            const service = req.body.service; 
            let price;
    
            if (service === "jne") {
                price = await rajaOngkir.getJNECost(params);
            } else if (service === "tiki") {
                price = await rajaOngkir.getTIKICost(params);
            } else if (service === "pos") {
                price = await rajaOngkir.getPOSCost(params);
            } else {
                throw new Error("Pilihan layanan tidak valid");
            }
    
            res.status(200).send({
                status: true,
                message: `Harga untuk layanan ${service}`,
                price
            });
        } catch (error) {
            console.error(error);
            res.status(400).send({
                status: false,
                message: error.message
            });
        }
    },
};
