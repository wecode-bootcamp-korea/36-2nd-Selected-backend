const express = require('express');
const resumesController = require('../controllers/resumesController');

const router = express.Router();

router.get("/", resumesController.getResumes);

module.exports = {
    router
};