const router = require('express').Router();
const { reportController } = require('../controllers')

router.get('/', reportController.getJournal);

module.exports = router;