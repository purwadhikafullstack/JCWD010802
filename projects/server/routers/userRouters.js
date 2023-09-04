const {userControllers} = require('../controllers')
const router = require('express').Router()



router.get("/list-user",userControllers.getUser)
router.get("/:id",userControllers.getUserProfile)

module.exports = router