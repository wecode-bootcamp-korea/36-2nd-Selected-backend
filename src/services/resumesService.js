const resumesDao = require("../models/resumesDao");

const getResumes = async () => {
    const getResumes = await resumesDao.getResumes();
    return getResumes;
};

module.exports = {
  getResumes
};