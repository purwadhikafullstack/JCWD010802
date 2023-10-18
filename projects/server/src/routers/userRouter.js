const router = require('express').Router();
const { userController } = require('../controllers');
const {verifyToken} = require('../middlewares/auth')
const {multerUpload} = require('../middlewares/multer')
const { checkEditProfile, checkGetUser, checkChangePassword } = require('../middlewares/userValidator')
const path = require('path');


router.get('/', verifyToken, checkGetUser, userController.getUser);
router.patch('/edit', verifyToken, checkEditProfile, userController.editProfile);
router.patch('/changePassword', verifyToken, checkChangePassword, userController.changePassword);
router.patch('/changeImage', verifyToken, multerUpload(path.join(__dirname, '../../public/profileImg'), 'profileImg').single('file'),userController.changeProfileImg);



module.exports = router;