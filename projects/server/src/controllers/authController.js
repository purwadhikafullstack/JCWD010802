const db = require("../models")
const user = db.user
const dbtoken = db.token
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const handlebars = require('handlebars')
const path = require("path")
const transporter = require('../middlewares/transporter')
const warehouseAdmin = db.warehouseAdmin

module.exports = {
    register: async (req, res) => {
        try {
            const { email, feURL } = req.body
            const t = await db.sequelize.transaction()

            const isEmailExist = await user.findOne({ where: { email } })
            if (isEmailExist) throw { message: "Email already used" }

            try {
                const result = await user.create({ email }, { transaction: t })

                const payload = { email: email, id: result.id }
                const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: "3d" })
                await dbtoken.create({ token, userId: result.id }, { transaction: t })

                const data = fs.readFileSync(path.join(__dirname, '../templates/register.html'), 'utf-8')
                const tempCompile = await handlebars.compile(data)
                const tempResult = tempCompile({ token, feURL })

                await transporter.sendMail({
                    from: process.env.USER_MAILER,
                    to: email,
                    subject: 'Registration Form',
                    html: tempResult
                })

                await t.commit()
                res.status(200).send({
                    status: true,
                    token
                })
            } catch (error) {
                await t.rollback()
                throw error
            }
            
        } catch (err) {
            res.status(400).send({
                status: false,
                message: err.message
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const result = await user.findOne({ 
                where: { email },
                include: [{ model: warehouseAdmin }]
            })
            const deletedUser = await user.findOne({where:{email,isDeleted:true}})
            if (deletedUser) throw {message:"Your Account is Banned"}
            const isValid = await bcrypt.compare(password, result.password)
            if (!isValid) throw { message: "Email or Password Incorrect" }

            let payload = { id: result.id }
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: '3d' })
            const findToken = await dbtoken.findOne(
                {where:{userId:result.id}}
            )
            if (findToken) {
                await findToken.destroy()
            }
            res.status(200).send({
                message: "Login Success, welcome!",
                result,
                token
            })
        } catch (err) {
            res.status(400).send({
                status: false,
                message: err.message
            })
        }
    },
    keepLogin: async (req, res) => {
        try {
            const { id } = req.user
            const result = await user.findOne({ 
                where: { id },
                include: [{ model: warehouseAdmin }]
            })
            res.status(200).send({
                status: true,
                result
            })
        } catch (err) {
            res.status(400).send({
                status: false,
                message: err.message
            })
        }
    },
    resendVerif: async (req, res) => {
        try {
            const { email, regisToken, feURL } = req.body

            const result = await user.findOne({ where: { email }})
            const tokenExist = await dbtoken.findOne({ where: { token: regisToken }})
            if (tokenExist) await dbtoken.destroy({ where: { token: regisToken }})
            
            const payload = { email: email, id: result.id }
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: "3d" })
            await dbtoken.create({ token })

            const data = fs.readFileSync(path.join(__dirname, '../templates/register.html'), 'utf-8')
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({ token, feURL })

            await transporter.sendMail({
                from: process.env.USER_MAILER,
                to: email,
                subject: 'Registration Form',
                html: tempResult
            })

            res.status(200).send({
                status: true,
                token
            })
        } catch (err) {
            res.status(400).send({
                status: false,
                message: err.message
            })
        }
    },
    verified : async (req, res) => {
        try {
            const {
                name,
                password,
                confirmPassword,
            } = req.body;
            if (password.length <= 6) {throw ('Password must be at least 6 characters')}
            if (password !== confirmPassword) {
                throw('Password not match')
            }
            const t = await db.sequelize.transaction();
            try {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                const result = await user.update({
                    name,
                    password: hashPassword,
                    isVerified: true,
                    roleId: 1
                }, {
                    where: {
                        email: req.user.email
                    },
                    transaction: t
                });
                await dbtoken.destroy({
                    where: {
                        userId: req.user.id
                    },
                    transaction: t
                })
                await t.commit()
                res.status(200).send({
                    status: true,
                    massage: 'Account has been updated and verified',
                    result
                }); 
            } catch (error) {
                await t.rollback()
                throw error
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        };
    },
    getVerifyToken: async (req, res) => {
        try {
            const result = await dbtoken.findOne({
                where: {
                    token: req.params.token
                }
            })
            if (!result) throw { message: "Access denied" }

            res.status(200).send({
                status: true,
                message: "Access granted"
            })
        } catch (error) {
            console.log(error);
            res.status(400).send({
                status: false,
                message: error.message
            });
        }
    }
}