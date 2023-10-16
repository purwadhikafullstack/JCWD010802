const { body, validationResult } = require('express-validator')

module.exports = {
    checkRegister: async (req, res, next) => {
        try {
            await body('email')
                .notEmpty().withMessage("Email cannot be empty")
                .isEmail().withMessage("Invalid email")
                .run(req)

            const validation = validationResult(req)

            if (validation.isEmpty()) {
                next()
            } else {
                return res.status(400).send({
                    status: false,
                    message: "Validation invalid",
                    error: validation.array()
                })
            }
        } catch (err) {
            res.status(400).send(err)
        }
    },
    checkLogin: async (req, res, next) => {
        try {
            await body('email')
                .notEmpty().withMessage("Email cannot be empty")
                .isEmail().withMessage("Invalid email")
                .run(req)
            await body('password')
                .notEmpty().withMessage("Password cannot be empty")
                .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols:1 }).withMessage("Password is not strong enough")
                .run(req)
            
            const validation = validationResult(req)

            if (validation.isEmpty()) {
                next()
            } else {
                return res.status(400).send({
                    status: false,
                    message: "Validation invalid",
                    error: validation.array()
                })
            }
        } catch (error) {
            res.status(400).send(error)
        }
    },
}