const {user} = require('../models')
const db = require("../models")
const forgotToken = db.token
const {Op, where} = require("sequelize")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const fs = require('fs')
const handlebars = require('handlebars')
const transporter = require('../middlewares/transporter')

module.exports = {
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const findUser = await user.findOne({where:{email:email}})
    
            const existingToken = await forgotToken.findOne({
                where: {
                    token: { [Op.not]: null }, 
                    createdAt: {
                        [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000), 
                    },
                    userId: findUser.id, 
                },
            });

            if (existingToken) {
                throw { message: "Only 1 password reset request at a time" };
            }
    
            const result = await user.findOne({
                where: {
                    email: email,
                },
            });
    
            if (!result) {
                throw { message: "Email not registered!" };
            }
    
            const payload = { id: result.id };
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: '1d' });
    
            await forgotToken.create({
                token: token,
                userId: result.id, 
            });
            const data = await fs.readFileSync('./reset.html', 'utf-8');
            const tempCompile = await handlebars.compile(data);
            const tempResult = tempCompile({ token });
    
            await transporter.sendMail({
                from: "kuga@gmail.com",
                to: email,
                subject: "Reset Password",
                html: tempResult,
            });
    
    
            res.status(200).send({ message: "Please check your email", token });
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },

    resetPassword : async(req,res)=>{
            try {
                const {password, confirmpassword} = req.body             
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)
                const result = await user.update(
                    {password : hashPassword}, {
                        where: {
                            id : req.user.id
                        }
                    }
                    )
                    const findToken = await forgotToken.findOne(
                        {where:{userId:req.user.id}}
                    )
            await findToken.destroy()
                    res.status(200).send({ message:"Change Password Success"})
        } catch (error) {
                console.log(error);
                res.status(400).send({message:"Reset Password Failed"})
            }
    }
}