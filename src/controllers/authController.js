const authService = require("../services/authService");

const kakaoLogIn = async (req, res) => {
  const headers = req.headers["authorization"];

  const kakaoToken = headers
    .split(" ")
    .filter((x, i) => i !== 0)
    .join(" ");

  const token = await authService.kakaoLogIn(
    JSON.parse(kakaoToken)["access_token"]
  );

  res.status(200).json({ token });
};

module.exports = {
  kakaoLogIn,
};
