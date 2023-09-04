const {warehouse} = require("../models")

module.exports = {
    getWarehouse : async(req,res) => {
        try {
            const result = await warehouse.findAll()
            res.status(200).send(result)
        } catch (error) {
            console.log(error);
        }
    }
}