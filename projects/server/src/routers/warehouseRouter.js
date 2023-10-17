const {warehouseController} = require('../controllers')
const { multerUpload } = require('../middlewares/multer')
const router = require('express').Router()
const path = require("path");

router.get("/",warehouseController.getWarehouse)
router.get("/list",warehouseController.warehouseList)
router.post("/",multerUpload(path.join(__dirname,'../../public/warehouseImg'), 'warehouseImg').single('file'), warehouseController.addWarehouse)
router.patch("/:id",multerUpload(path.join(__dirname,'../../public/warehouseImg'), 'warehouseImg').single('file'), warehouseController.updateWarehouse)
router.delete("/:id",warehouseController.deleteWarehouse)

module.exports = router
