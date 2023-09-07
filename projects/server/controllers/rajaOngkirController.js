const axios = require('axios');
require('dotenv').config()

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
};
