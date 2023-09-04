const {adminControllers} = require('../controllers')
const router = require('express').Router()



router.post("/",adminControllers.addAdmin)
router.get("/",adminControllers.getAdmin)
router.get("/profile",adminControllers.getAdminProfile)
router.delete("/:id",adminControllers.deleteAdmin)
router.patch("/:id",adminControllers.changeAdminWarehouse)

module.exports = router