const router = require('express').Router();
const { addressController } = require('../controllers');
const { checkAddAddress, checkGetAddress, checkUpdateAddress, checkDeleteAddress } = require('../middlewares/addressValidator');
const {verifyToken} = require('../middlewares/auth')

router.post('/add', verifyToken, checkAddAddress, addressController.addAddress);
router.get('/', verifyToken, checkGetAddress, addressController.getAddress);
router.patch('/update/:id', verifyToken, checkUpdateAddress, addressController.updateAddress);
router.patch('/delete/:id', verifyToken, checkDeleteAddress, addressController.deleteAddress);
router.patch('/primary/:id', verifyToken, addressController.primaryAddress);


module.exports = router;