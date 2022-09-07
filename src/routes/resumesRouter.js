const express = require('express');
const resumesController = require('../controllers/resumesController');
const errorHandler = require("../middlewares/errorHandler");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/list",auth.validateToken, errorHandler(resumesController.getResumes));
router.get("/:resumesid",auth.validateToken, errorHandler(resumesController.getResumesId));
router.post("/addresume",auth.validateToken, errorHandler(resumesController.postResumesInfo));
router.post("/addskill",auth.validateToken, errorHandler(resumesController.postSkills));
router.post("/addurl",auth.validateToken, errorHandler(resumesController.postUrls));
router.delete("/:resumesId",auth.validateToken, errorHandler(resumesController.deleteResumesId));

module.exports = {
    router
};