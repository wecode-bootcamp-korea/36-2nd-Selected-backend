const jobDao = require('../models/jobDao');
const validation = require('../utils/validations');
const AppError = require('../middlewares/appError');

const getJobList = async (offset, limit, jobTags, jobSort) => {
    console.log(jobSort);
    validation.validateNumberType(offset);
    validation.validateNumberType(limit);
    if (jobTags) validation.validateNumberType(jobTags);
    if (jobSort) validation.validateNumberType(jobSort);

    let jobs;

    if (!jobTags && !jobSort) jobs = await jobDao.getJobList(offset, limit);
    else if (jobTags && !jobSort) jobs = await jobDao.getJobListByTags(offset, limit, jobTags);
    else if (!jobTags && jobSort) jobs = await jobDao.getJobListByCategory(offset, limit, jobSort);
    else jobs = await jobDao.getJobListByTagAndCategory(offset, limit, jobTags, jobSort);

    if (!jobs[0]) throw new AppError("NO_DATA", 409);
    return jobs;
}

const getJobMainList = async (offset, limit, jobTags) => {
    validation.validateNumberType(jobTags);
    if (!offset || !limit) {
        offset = 0;
        limit = 10;
    }

    return await jobDao.getJobListByTags(offset, limit, jobTags);
}

const getJobDetailListPage = async (jobId, offset, limit) => {
    validation.validateNumberType(jobId);

    const job = await jobDao.getJobById(jobId);

    if (!job) throw new AppError('INVALID_DATA', 409);

    if (!offset || !limit) {
        var recoomendationOffsetDefault = 0;
        var recommendationLimitDefault = 20;
    }

    const datas = {
        jobInfo: await jobDao.getJobDetailList(jobId),
        subImage: await jobDao.getSubImage(jobId),
        jobTags: await jobDao.getJobTags(jobId),
        jobSkills: await jobDao.getJobSkills(jobId),
        jobRecomendations: await jobDao.getJobRecomendations(recoomendationOffsetDefault, recommendationLimitDefault)
    }

    return datas;
}

module.exports = {
    getJobDetailListPage,
    getJobList,
    getJobMainList
}