const jwt = require("jsonwebtoken");

const secretKey = process.env.TOKEN_SECRET;

const validateToken = async (req, res, next) => {

  try {

    const token = await req.header("authorization");
    const token1 = String(JSON.parse(token))
    console.log(token);

    const decoded = await jwt.verify(token1, secretKey);

    req.kakaoId = decoded;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "INVALID_TOKEN" });
  }
};

module.exports = {
  validateToken,
};