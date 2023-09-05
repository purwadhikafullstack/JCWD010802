const {adminControllers} = require('../controllers')
const router = require('express').Router()



router.post("/",adminControllers.addAdmin)
router.get("/",adminControllers.getAdmin)
router.get("/profile",adminControllers.getAdminProfile)
router.patch("/warehouse/:id",adminControllers.changeAdminWarehouse)
router.patch("/:id",adminControllers.editAdmin)
router.delete("/:id",adminControllers.deleteAdmin)

module.exports = router