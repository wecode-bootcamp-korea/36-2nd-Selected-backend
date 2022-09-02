const express = require("express");
const router = express.Router();

const authRouter = require("./authRouter");
router.use("/auths", authRouter.router);

module.exports = router; 
