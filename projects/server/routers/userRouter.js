const router = require('express').Router();
const { userController } = require('../controllers');
const {verifyToken} = require('../middlewares/auth')
const {multerUpload} = require('../middlewares/multer')
const { checkEditProfile, checkGetUser, checkChangePassword } = require('../middlewares/userValidator')


router.patch('/edit', verifyToken, checkEditProfile, userController.editProfile);
router.get('/', verifyToken, checkGetUser, userController.getUser);
router.patch('/changePassword', verifyToken, checkChangePassword, userController.changePassword);
router.patch('/changeImage', verifyToken, multerUpload('./public/profileImg', 'profileImg').single('file'),userController.changeProfileImg);



module.exports = router;