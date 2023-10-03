const router = require('express').Router();
const { dashboardController } = require('../controllers');

router.get("/", dashboardController.basicInfo)

module.exports = router