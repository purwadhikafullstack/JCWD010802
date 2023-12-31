const { banner, user } = require("../models")

module.exports = {
    uploadBanner: async (req, res) => {
        try {
            const isAdmin = await user.findOne({
                where: { id: req.user.id }
            })
            if (isAdmin.roleId < 3) throw { message: "Only admin can change banners" }

            await banner.update({ isDeleted: true }, { where: {
                id: req.body.currentId
            }})
            const result = await banner.create({
                bannerImg: req.file.filename
            })

            res.status(200).send({
                message: "Banner uploaded!",
                result
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message,
            }); 
        }
    },
    getBanner: async (req, res) => {
        try {
            const result = await banner.findAll({ where: { isDeleted: false } })

            res.status(200).send({
                result
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message,
            });
        }
    },
    addBanner: async (req, res) => {
        try {
            const isAdmin = await user.findOne({
                where: { id: req.user.id }
            })
            if (isAdmin.roleId < 3) throw { message: "Only admin can change banners" }

            const result = await banner.create({
                bannerImg: req.file.filename
            })

            res.status(200).send({
                message: "Banner uploaded!",
                result
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message,
            });
        }
    },
    deleteBanner: async (req, res) => {
        try {
            console.log(req.user);
            const isAdmin = await user.findOne({
                where: { id: req.user.id }
            })
            if (isAdmin.roleId < 3) throw { message: "Only admin can change banners" }

            await banner.update({ isDeleted: true},{
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send({
                status: true,
                message: "Banner successfuly deleted"
            })
        } catch (error) {
            console.log(error);
            res.status(400).send({
                status: false,
                message: error.message,
            });
        }
    }
}