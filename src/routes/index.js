const express = require('express');
const router = express.Router();
const jobRouter = require('./jobRouter');

router.use('/jobs', jobRouter.router);

const authRouter = require("./authRouter");
router.use("/auths", authRouter.router);

module.exports = router; 
