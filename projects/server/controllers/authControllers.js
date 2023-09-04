const {user} = require('../models')
const {Op} = require("sequelize")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const fs = require('fs')
const handlebars = require('handlebars')
const transporter = require('../middlewares/transporter')

module.exports = {
    forgotPassword : async(req,res)=> {
        try {
            const {email} = req.body
            const result = await user.findOne(
                {
                where:{
                    email: email
                }
            }
        )
        if (!result) throw {message: "Email not registered!"}
        if(result.password === null) throw {message: "Only 1 request at a time"}
        const payload = {id: result.id}
        const token = jwt.sign(payload, process.env.KEY_JWT, {expiresIn: '1d'})
        
        
        const data = await fs.readFileSync('./reset.html', 'utf-8')
        const tempCompile  = await handlebars.compile(data)
        const tempResult = tempCompile({token})
        await transporter.sendMail({
            from:"kuga@gmail.com",
            to: email,
            subject: "Reset Password",
            html:tempResult
        })
        await user.update(
            {password: null},
            {where:{
                id: result.id
            }}
        
            )
            res.status(200).send({message:"Please check your email",token})
        } catch (error) {
            console.log(error);
            res.status(400).send(error)

        }
    },

    resetPassword : async(req,res)=>{
            try {
                const {password, confirmpassword} = req.body
                // if(confirmpassword !== password) throw {message: "password tidak sesuai"}
                // const cektoken = await user.findOne(
                //     {
                //         where : {
                //             id : req.user.id
                //         }
                //     }
                // )
                // if(req.token == cektoken.token)
             
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)
                const result = await user.update(
                    {password : hashPassword}, {
                        where: {
                            id : req.user.id
                        }
                    }
                    )
    
                    res.status(200).send({result, message:"password berhasil diubah"})
            
        } catch (error) {
                console.log(error);
                res.status(400).send(error)
            }
    }
}