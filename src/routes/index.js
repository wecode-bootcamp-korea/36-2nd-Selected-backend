const express = require("express");
const router = express.Router();

const authRouter = require("./authRouter");
router.use("/auths", authRouter.router);

const resumesRouter = require("./resumesRouter");
router.use("/resumes", resumesRouter.router);

module.exports = router;