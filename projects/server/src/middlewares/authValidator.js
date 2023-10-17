const { body, header, validationResult } = require('express-validator')

module.exports = {
    checkRegister : async(req,res,next) => {
        try {
            await body('email').notEmpty().withMessage("Email required").isEmail().run(req)

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
    checkVerified : async(req,res,next) => {
        try {
            await header('authorization').notEmpty().withMessage("Token required").run(req)
            await body('name').notEmpty().withMessage("Name required").run(req)
            await body('password').notEmpty().isStrongPassword({
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }).run(req)
            await body ('confirmPassword').notEmpty().equals(req.body.password).withMessage(" password not match").run(req)

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
