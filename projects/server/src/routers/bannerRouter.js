const { bannerController } = require("../controllers")
const { verifyToken } = require("../middlewares/auth")
const { multerUpload } = require("../middlewares/multer")

const router = require("express").Router()

router.post("/", verifyToken, multerUpload('./public/bannerImg', 'bannerImg').single('file'), bannerController.uploadBanner)
router.get("/", verifyToken, bannerController.getBanner)

module.exports = router