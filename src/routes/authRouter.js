const express = require("express");

const authController = require("../controllers/authController");
const errorHandler = require("../middlewares/errorHandler");

const router = express.Router();

router.post("/kakao-login", errorHandler(authController.kakaoLogIn));

module.exports = {
  router,
};
