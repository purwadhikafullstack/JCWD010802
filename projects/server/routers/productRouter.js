const router = require('express').Router();
const { productController } = require('../controllers');
const { verifyToken } = require('../middlewares/auth');
const { multerUpload } = require('../middlewares/multer')

router.get('/', productController.allProduct);
router.post('/', verifyToken, multerUpload('./public/productImg', 'productImg').single('file'),productController.createProduct);
router.get('/:id', productController.detailProduct);
router.patch('/edit/:id', verifyToken, multerUpload('./public/productImg', 'productImg').single('file'),productController.editProduct);
router.patch('/delete/:id', verifyToken, productController.deleteProduct);
router.patch('/activate/:id', verifyToken, productController.activateProduct)


module.exports = router;