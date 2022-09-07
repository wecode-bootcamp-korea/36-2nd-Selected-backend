const resumesDao = require("../models/resumesDao");

const getResumes = async (kakaoId) => {
    const getResumes = await resumesDao.getResumes(kakaoId);
    return getResumes;
};

const getResumesId = async (resumesId, kakaoId) => {
    const getResumesId = await resumesDao.getResumesId(resumesId, kakaoId);
    return getResumesId;
};
 
const postResumesInfo = async (resumesInfo) => {
    const kakaoId = resumesInfo.kakaoId
    const title = resumesInfo.title
    const introduction = resumesInfo.introduction
    console.log(kakaoId, title,introduction)
    const resumeInfo  = await resumesDao.postResumesInfo(kakaoId, title, introduction)
    return resumeInfo;
};

const postSkills = async (resumeSkill) => {
    const skillId = resumeSkill[0].skill
    const resumeId = resumeSkill[0].resumeId
    console.log(skillId,resumeId);
    const resumesId = await resumesDao.postSkills(skillId, resumeId);
    return resumesId;
};

const postUrls = async (linkUrls) => {
    const linkUrl = linkUrls[0].linkUrl
    const resumeId = linkUrls[0].resumeId
    console.log(linkUrl,resumeId);
    const resumesId = await resumesDao.postUrls(linkUrl, resumeId);
    return resumesId;
};

const deleteResumesId = async (resumesId) => await resumesDao.deleteResumesId(resumesId);
    
module.exports = {
  getResumes,
  getResumesId,
  postResumesInfo,
  postSkills,
  postUrls,
  deleteResumesId
};