const router = require('express').Router();
const { categoryController } = require('../controllers')

router.get('/', categoryController.allCategory);
router.post('/', categoryController.createCategory);
router.patch('/edit/:id', categoryController.updateCategory);
router.patch('/delete/:id', categoryController.deleteCategory);

module.exports = router;