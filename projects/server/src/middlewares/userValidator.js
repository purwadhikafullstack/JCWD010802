const { body, header, validationResult } = require('express-validator')

module.exports = {
    checkGetUser : async(req,res,next) => {
        try {
            await header('authorization').notEmpty().withMessage("Token required").run(req)
            const validation = validationResult(req)
            if (validation.isEmpty()) {
                next()
            }
            else{
                return res.status(400).send({
                    status: false,
                    msg: 'Invalid validation',
                    error: validation.array()
                })
            }

        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    checkEditProfile : async(req,res,next) => {
        try {
            await header('authorization').notEmpty().withMessage("Token required").run(req)
            await body('name').notEmpty().withMessage("Name required").run(req)
            await body('email').notEmpty().isEmail().withMessage("Email required").run(req)

            const validation = validationResult(req)
            if (validation.isEmpty()) {
                next()
            }
            else{
                return res.status(400).send({
                    status: false,
                    msg: 'Invalid validation',
                    error: validation.array()
                })
            }

        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    checkChangePassword : async(req,res,next) => {
        try {
            await header('authorization').notEmpty().withMessage("Token required").run(req)
            await body('oldPassword').notEmpty().withMessage("Password required").run(req)
            await body('password').notEmpty().isStrongPassword({
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }).withMessage("Password not fill required").run(req)
            await body ('confirmPassword').notEmpty().equals(req.body.password).withMessage("Password not match").run(req)
            
            const validation = validationResult(req)
            if (validation.isEmpty()) {
                next()
            }
            else{
                return res.status(400).send({
                    status: false,
                    msg: 'Invalid validation',
                    error: validation.array()
                })
            }

        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
}
