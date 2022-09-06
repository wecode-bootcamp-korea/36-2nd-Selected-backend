const authDao = require("../models/authDao");
const AppError = require("../middlewares/appError");

const axios = require("axios");
const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;

const kakaoLogIn = async (kakaoToken) => {
  const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });

  // console.log("result.data: ", result.data);

  const name = result.data.kakao_account.profile.nickname;
  const email = result.data.kakao_account.email;
  const kakaoId = result.data.id;

  if (!name || !email || !kakaoId) throw new AppError("KEY_ERROR", 400);

  const isUser = await authDao.getUserByKakaoId(kakaoId);
  if (!isUser) await authDao.kakaoSignUp(name, email, kakaoId);

  const token = jwt.sign({ kakaoId, email, name }, secret);

  // const decode = jwt.decode(token, secret);
  // console.log("decode: ", decode);

  return token;
};

module.exports = {
  kakaoLogIn,
};
