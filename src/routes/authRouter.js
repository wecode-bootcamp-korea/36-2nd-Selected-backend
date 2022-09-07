const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/kakao-login", errorHandler(authController.kakaoLogIn));

module.exports = {
  router,
};
