const { AppDataSource } = require("../models/dataSource");
const AppError = require("../middlewares/appError");

const getResumes = async (kakaoId) => {
    try {
        return await AppDataSource.query(
        `SELECT
           r.id as resumeId,
           u.name as userName,
           r.title as title,
           DATE_FORMAT(r.updated_at, "%Y-%c-%e") as date
           FROM resumes r
           INNER JOIN users u ON r.user_id = u.id
           WHERE u.kakao_id = ${kakaoId}`
      );
    } catch (err) {
      throw new AppError("MAIN_DOES_NOT_EXIST", 500);
    }
  }
  
const getResumesId = async (resumesId, kakaoId) => {
    try {
        const [resumeInfo] = await AppDataSource.query(`
            SELECT
            r.id as resumeId,
            u.name as userName,
            u.email as email,
            r.title as title,
            r.introduction as introduction
            FROM resumes r
            INNER JOIN users u ON r.user_id = u.id
            WHERE u.kakao_id = ${kakaoId}
        `);

        const resumeSkill = await AppDataSource.query(`
            SELECT
            skill AS skillId
            FROM resumes r
            INNER JOIN resumes_skills rs ON rs.resumes_id = r.id
            INNER JOIN skills s ON s.id = rs.skill_id
            INNER JOIN users u ON r.user_id = u.id         
            WHERE r.id = ${resumesId}
        `);
              
        const linkUrls = await AppDataSource.query(`
            SELECT
            pu.link_url as linkUrl
            FROM portfolio_urls pu
            INNER JOIN resumes r ON r.id = pu.resumes_id
            INNER JOIN users u ON r.user_id = u.id         
            WHERE r.id = ${resumesId}
        `);

        const userCareers = await AppDataSource.query(`
            SELECT
            DATE_FORMAT(uc.career_start, "%Y-%c-%e") as startDate,
            DATE_FORMAT(uc.career_end, "%Y-%c-%e") as endDate,
            uc.company_name as companyName,
            uc.department
            FROM user_careers uc
            INNER JOIN resumes r ON r.id = uc.resumes_id            
            INNER JOIN users u ON r.user_id = u.id         
            WHERE r.id = ${resumesId}
        `);

        const data = {
          resumeInfo,
          resumeSkill,
          linkUrls,
          userCareers
        }
        return data;

      } catch (err) {
        throw new AppError("MAIN_DOES_NOT_EXIST", 500);
      }
      }

const postResumesInfo = async (kakaoId, title, introduction) => {
    try {

        const user_id = await AppDataSource.query(
          `SELECT id 
            FROM users u
            WHERE u.kakao_id = ${kakaoId};`
        );

        const postResume = await AppDataSource.query(
        `INSERT INTO resumes (
            user_id,
            title,
            introduction
        ) VALUES (?,?,?);
        `,[user_id[0].id, title, introduction]
      );

      return postResume.insertId;
    } catch (err) {
      throw new AppError("MAIN_DOES_NOT_EXIST", 500);
    }
    }

const postSkills = async (skill_id, resume_id) => {
    try {
        return await AppDataSource.query(`
        INSERT INTO resumes_skills (
         skill_id,
         resumes_id
        ) VALUES (?,?)
        `, [skill_id, resume_id]
      );
    } catch (err) {
      throw new AppError("MAIN_DOES_NOT_EXIST", 500);
    }
    }

const postUrls = async (link_url, resume_id) => {
    try {
        return await AppDataSource.query(
        `INSERT INTO portfolio_urls (
         link_url,
         resumes_id
        ) VALUES (?,?);
        `, 
        [link_url, resume_id]
      );
    } catch (err) {
      throw new AppError("MAIN_DOES_NOT_EXIST", 500);
    }
    };

const deleteResumesId = async (resumesId) => {
  try {
    return await AppDataSource.query(`
      DELETE FROM resumes
      WHERE resumes.id = ${resumesId}`
    );
  } catch (err) {
    throw new AppError("MAIN_DOES_NOT_EXIST", 500);
  }
  };

const getResumesIdByUserId = async (kakaoId) => {
  try {
    const [resumeId] = await AppDataSource.query(`
      SELECT
        resumes.id
      FROM resumes
      INNER JOIN users ON users.id = resumes.user_id
      WHERE users.kakao_id = ${kakaoId}
    `)

    return resumeId;
  } catch (err) {
    throw new AppError("MAIN_DOES_NOT_EXIST", 500);
  }
}

  module.exports = { 
    getResumes,
    getResumesId,
    postResumesInfo,
    postSkills,
    postUrls,
    deleteResumesId,
    getResumesIdByUserId
  };