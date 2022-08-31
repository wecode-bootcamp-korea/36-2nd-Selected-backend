const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.get('/list', errorHandler(jobController.getJobList));
router.get('/main', errorHandler(jobController.getJobMainList));
router.get('/details/:jobId', errorHandler(jobController.getJobDetailListPage));

module.exports = {
    router
}