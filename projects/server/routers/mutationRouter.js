const {mutationController} = require("../controllers") 
const router = require('express').Router()


router.post("/manual",mutationController.manualRequest)
router.get("/super",mutationController.allSuperRequest)
router.get("/incoming/:id",mutationController.incomingRequest)
router.get("/:id",mutationController.allRequest)
router.patch("/reject/:id",mutationController.rejectRequest)
router.patch("/accept/:id",mutationController.acceptRequest)
module.exports = router