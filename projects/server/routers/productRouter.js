const router = require('express').Router();
const { productController } = require('../controllers')
const {multerUpload} = require('../middlewares/multer')


router.get('/', productController.allProduct);
router.post('/', multerUpload('./public/productImg', 'productImg').single('file'),productController.createProduct);
router.patch('/edit/:id', multerUpload('./public/productImg', 'productImg').single('file'),productController.editProduct);
router.patch('/delete/:id', productController.deleteProduct);


module.exports = router;