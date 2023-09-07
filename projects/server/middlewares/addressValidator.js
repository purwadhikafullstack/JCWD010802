const { body, header, validationResult, param } = require('express-validator')

module.exports = {
    checkAddAddress : async(req,res,next) => {
        try {
            await header('authorization').notEmpty().withMessage("Token required").run(req)
            await body('address').notEmpty().withMessage("Address required").run(req)
            await body('kota').notEmpty().withMessage("City required").run(req)
            await body('provinsi').notEmpty().withMessage("Province required").run(req)
            await body('kode_pos').notEmpty().withMessage("Postal code required").run(req)
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
    checkGetAddress : async(req,res,next) => {
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
    checkUpdateAddress : async(req,res,next) => {
        try {
            await header('authorization').notEmpty().withMessage("Token required").run(req)
            await param('id').notEmpty().withMessage("Params id required").run(req)
            await body('address').notEmpty().withMessage("Address required").run(req)
            await body('kota').notEmpty().withMessage("City required").run(req)
            await body('provinsi').notEmpty().withMessage("Province required").run(req)
            await body('kode_pos').notEmpty().withMessage("Postal code required").run(req)
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
