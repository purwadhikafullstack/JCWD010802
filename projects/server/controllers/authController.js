const db = require("../models")
const user = db.user
const dbtoken = db.token
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const handlebars = require('handlebars')
const transporter = require('../middlewares/transporter')

module.exports = {
    register: async (req, res) => {
        try {
            const { email } = req.body

            const isEmailExist = await user.findOne({ where: { email } })
            if (isEmailExist) throw { message: "Email already used" }

            const result = await user.create({ email })

            const payload = { email: email, id: result.id }
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: "3d" })
            await dbtoken.create({ token })

            const data = fs.readFileSync('./templates/register.html', 'utf-8')
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({ token })

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
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const result = await user.findOne({ where: { email }})
            if (!result) throw { message: "Email or Password Incorrect" }

            // if (password !== result.password) throw { message: "Email or Password Incorrect" }
            const isValid = await bcrypt.compare(password, result.password)
            if (!isValid) throw { message: "Email or Password Incorrect" }

            let payload = { id: result.id }
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: '3d' })

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

            const result = await user.findOne({ where: { id }})

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
            const { email, regisToken } = req.body

            const result = await user.findOne({ where: { email }})
            const tokenExist = await dbtoken.findOne({ where: { token: regisToken }})
            if (tokenExist) await dbtoken.destroy({ where: { token: regisToken }})
            
            const payload = { email: email, id: result.id }
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: "3d" })
            await dbtoken.create({ token })

            const data = fs.readFileSync('./templates/register.html', 'utf-8')
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({ token })

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
    }
}