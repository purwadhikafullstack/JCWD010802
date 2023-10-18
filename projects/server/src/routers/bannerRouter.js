const { bannerController } = require("../controllers")
const { verifyToken } = require("../middlewares/auth")
const { multerUpload } = require("../middlewares/multer")

const router = require("express").Router()

router.patch("/", verifyToken, multerUpload('/bannerImg', 'bannerImg').single('file'), bannerController.uploadBanner)
router.get("/", bannerController.getBanner)
router.post("/", verifyToken, multerUpload('/bannerImg', 'bannerImg').single('file'), bannerController.addBanner)
router.put("/:id", verifyToken, bannerController.deleteBanner)

module.exports = router