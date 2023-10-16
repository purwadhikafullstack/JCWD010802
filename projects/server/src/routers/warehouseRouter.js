const {warehouseController} = require('../controllers')
const { multerUpload } = require('../middlewares/multer')
const router = require('express').Router()

router.get("/",warehouseController.getWarehouse)
router.get("/list",warehouseController.warehouseList)
router.post("/",multerUpload('./public/warehouseImg', 'warehouseImg').single('file'), warehouseController.addWarehouse)
router.patch("/:id",multerUpload('./public/warehouseImg', 'warehouseImg').single('file'), warehouseController.updateWarehouse)
router.delete("/:id",warehouseController.deleteWarehouse)

module.exports = router