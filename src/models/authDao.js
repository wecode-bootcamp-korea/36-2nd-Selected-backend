const AppError = require("../middlewares/appError");
const { AppDataSource } = require("./dataSource");

const kakaoSignUp = async (name, email, kakaoId) => {
  try {
    await AppDataSource.query(
      `
        INSERT INTO users (
            name,
            email,
            kakao_id
        ) VALUES (?, ?, ?);`,
      [name, email, kakaoId]
    );
  } catch (err) {
    throw new AppError("INVALID_DATA_INPUT", 500);
  }
};

const getUserByKakaoId = async (kakaoId) => {
  try {
    const [isUser] = await AppDataSource.query(`
        SELECT EXISTS 
            (SELECT * FROM users
            WHERE kakao_id = ${kakaoId}) 
        AS isExists`);
    return +isUser.isExists;
  } catch (err) {
    throw new AppError("INVALID_DATA_INPUT", 500);
  }
};

module.exports = {
  kakaoSignUp,
  getUserByKakaoId,
};
