const { bannerController } = require("../controllers")
const { verifyToken } = require("../middlewares/auth")
const { multerUpload } = require("../middlewares/multer")
const path = require("path");

const router = require("express").Router()

router.post("/", verifyToken, multerUpload(path.join(__dirname,'../../public/bannerImg'), 'bannerImg').single('file'), bannerController.uploadBanner)
router.get("/", bannerController.getBanner)

module.exports = router