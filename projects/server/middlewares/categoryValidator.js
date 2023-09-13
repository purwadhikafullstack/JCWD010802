const { body, header, validationResult, param } = require('express-validator')

module.exports = {
    checkGetCategory : async(req,res,next) => {
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
    checkAddCategory : async(req,res,next) => {
        try {
            await header('authorization').notEmpty().withMessage("Token required").run(req)
            await body('name').notEmpty().withMessage("Name required").run(req)
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
    checkUpdateCategory : async(req,res,next) => {
        try {
            await header('authorization').notEmpty().withMessage("Token required").run(req)
            await body('name').notEmpty().withMessage("Name required").run(req)
            await param('id').notEmpty().withMessage("Params id required").run(req)
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
    checkDeleteAddress : async(req,res,next) => {
        try {
            await header('authorization').notEmpty().withMessage("Token required").run(req)
            await param('id').notEmpty().withMessage("Params id required").run(req)
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
