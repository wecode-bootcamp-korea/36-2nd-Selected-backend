const express = require('express');
const router = express.Router();
const jobRouter = require('./jobRouter');
const authRouter = require("./authRouter");
const resumesRouter = require("./resumesRouter");

router.use('/jobs', jobRouter.router);
router.use("/auths", authRouter.router);
router.use("/resumes", resumesRouter.router);

module.exports = router; 