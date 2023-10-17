const router = require('express').Router();
const { categoryController } = require('../controllers')
const {multerUpload} = require('../middlewares/multer')
const path = require('path');



router.get('/', categoryController.allCategory);
router.post('/', multerUpload(path.join(__dirname, '../../public/categoryImg'), 'categoryImg').single('file'), categoryController.createCategory);
router.patch('/edit/:id', multerUpload(path.join(__dirname, '../../public/categoryImg'), 'categoryImg').single('file'), categoryController.updateCategory);
router.patch('/delete/:id', categoryController.deleteCategory);

module.exports = router;