const db = require('../models');
const user = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailer = require('../middlewares/mailer');
const fs = require('fs');
const handlebars = require('handlebars');
require('dotenv').config()
 
module.exports = {
    register: async (req, res) => {
        try {
            const email = req.body.email;
            const emailExist = await user.findOne({
                where: {
                    email
                }
            });
            if (emailExist) {
                throw { message: 'Email has been used' };
            }
            const result = await user.create({email: email});
            const data = await fs.readFileSync('./templates/verify.html', 'utf-8');
            const tempCompile = await handlebars.compile(data);
            const payload = {email: email, id: result.id};
            const token = jwt.sign(payload, process.env.KEY_JWT, {expiresIn: '7d'});
            const tempResult = tempCompile({token: token});
            await mailer.sendMail({
                from: "fathir17.fa@gmail.com",
                to: email,
                subject: "Verify account for register",
                html: tempResult
            });
            res.status(200).send({
                status: true,
                massage: 'Please check your email',
                result,
                token
            });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
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
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const result = await user.update({
                name,
                password: hashPassword,
                isVerified: true
            }, {
                where: {
                    email: req.user.email
                }
            });
            res.status(200).send({
                status: true,
                massage: 'Account has been updated and verified',
                result
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                status: false,
                message: err.message
            });
        };
    },
}