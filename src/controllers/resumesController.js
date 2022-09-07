const resumesService = require("../services/resumesService");
const authService = require("../services/authService");

const getResumes = async (req, res) => {
        const {kakaoId} = req.kakaoId;
        const resumes = await resumesService.getResumes(kakaoId);
        res.status(200).json(resumes);
  };

const getResumesId = async (req, res) => {
        const {kakaoId}= req.kakaoId;
        const { resumesid } = req.params;
        const ResumesId = await resumesService.getResumesId(resumesid, kakaoId);
        res.status(200).json(ResumesId);
  };

const postResumesInfo = async (req, res) => {
      const {kakaoId} = req.kakaoId;
      const resumesInfo = req.body;
      resumesInfo.kakaoId = kakaoId;
      const resumeId = await resumesService.postResumesInfo(resumesInfo);
      
      console.log(resumeId)
      res.status(201).json({ resumeId: `${resumeId}` });
  };

const postSkills = async (req, res) => {
      const {resumeSkill} = req.body
      
      await resumesService.postSkills(resumeSkill);
      res.status(200).json({"message":"ADD_SKILL!"});
  };

const postUrls = async (req, res) => {
      const {linkUrls} = req.body;
      console.log(req.body);
      await resumesService.postUrls(linkUrls);
      res.status(200).json({"message":"ADD_URL!"});
  }; 
  
const deleteResumesId = async (req, res) => {
    const { resumesId } = req.params;
    await resumesService.deleteResumesId(resumesId);
    res.status(201).json({ message: "RESUME_DELETED!" });
};

module.exports = {
  getResumes,
  getResumesId,
  postResumesInfo,
  postSkills,
  postUrls,
  deleteResumesId
};