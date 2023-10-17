const db = require('../models');
const user = db.user;
const bcrypt = require('bcrypt')
const mailer = require('../middlewares/mailer')
const fs = require('fs')
const handlebars = require('handlebars')
const path = require('path');


module.exports = {
    getUser: async (req, res) => {
        try {
            const result = await user.findAll({where: {id: req.user.id},
            });
            res.status(200).send({
                status: true,
                message: 'Detail address',
                result,
            });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        }
    },
    editProfile : async(req, res) => {
        try {
            const { name,email } = req.body
            const sameEmail = await user.findOne({
                where: {id : req.user.id}
            })
            if (email == sameEmail.email && sameEmail.id !== req.user.id) {throw('Email already exists')}
            const result = await user.update(
                {name: name, email:email},
                {where: {id: req.user.id}}
            )
            const data = fs.readFileSync(path.join(__dirname, '../templates/changing.html'), "utf-8");
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({data:name, description: "User profile has been changed"})
            await mailer.sendMail({
                from: "fathir17.fa@gmail.com",
                to: email,
                subject: "Update biodata",
                html: tempResult
            })
            res.status(200).send({
                msg: "Success to update biodata, please check your email",
                status: true,
                result,
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    changePassword : async(req, res) => {
        try {
            const { oldPassword,password,confirmPassword } = req.body
            const passExist = await user.findOne( 
                {where: {id : req.user.id}} 
            )
            const compare = await bcrypt.compare(oldPassword, passExist.password)
            if (!compare) {throw('Incorrect password')}
            if (password !== confirmPassword) {throw('Password mismatch')}

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password,salt)
            const result = await user.update(
                {password:hashPassword},
                {where: {id: req.user.id}}
            )
            const updatedUser = await user.findOne( 
                {where: {id : req.user.id}},
                )
            const data = fs.readFileSync(path.join(__dirname, '../templates/changing.html'), "utf-8");
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({ data: updatedUser.name, description: "User password has been changed" })
            await mailer.sendMail({
                from: "fathir17.fa@gmail.com",
                to: passExist.email,
                subject: "Change password",
                html: tempResult
            })
            res.status(200).send({
                msg: "Success change password",
                status: true,
                result,
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    changeProfileImg: async (req, res) => {
        try {
            if (req.file.size > 1024 * 1024) throw {
                status: false,
                message: "file size to large"
            }
            const tempData = await user.findOne({
                where : {id: req.user.id}
            })
            await user.update({
                profileImg: req.file.filename
            }, {
                where: {
                    id: req.user.id
                }
            })
            const data = fs.readFileSync(path.join(__dirname, '../templates/changing.html'), "utf-8");
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({ data: tempData.name, description: "Profile image has been changed" })
            await mailer.sendMail({
                from: "fathir17.fa@gmail.com",
                to: tempData.email,
                subject: "Change profile image",
                html: tempResult
            })
            res.status(200).send({
                status: true,
                msg: "Success change profile image",
            })
        } catch (err) {
            res.status(400).send(err)
            console.log(err);
        }
    }
};