const authService = require("../services/authService");

const kakaoLogIn = async (req, res) => {
  // const headers = req.headers["authorization"];

  // const kakaoToken = headers
  //   .split(" ")
  //   .filter((x, i) => i !== 0)
  //   .join(" ");

  // const token = await authService.kakaoLogIn(
  //   JSON.parse(kakaoToken)["access_token"]
  // );

  const headers = req.headers["authorization"];
  const token = await authService.kakaoLogIn(headers);
  console.log("last token: ", token);

  res.status(200).json({ token });
};

module.exports = {
  kakaoLogIn,
};
