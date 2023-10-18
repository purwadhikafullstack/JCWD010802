const router = require('express').Router();
const { categoryController } = require('../controllers')
const {multerUpload} = require('../middlewares/multer')

router.get('/', categoryController.allCategory);
router.post('/', multerUpload('/categoryImg', 'categoryImg').single('file'), categoryController.createCategory);
router.patch('/edit/:id', multerUpload('/categoryImg', 'categoryImg').single('file'), categoryController.updateCategory);
router.patch('/delete/:id', categoryController.deleteCategory);

module.exports = router;