const jobService = require('../services/jobService');
const AppError = require('../middlewares/appError');

const getJobList = async (req, res) => {
    const { offset, limit, jobTags, jobSort } = req.query;

    if (!limit || !offset) throw new AppError('KEY_ERROR', 400);

    const list = await jobService.getJobList(offset, limit, jobTags, jobSort);

    res.status(200).json({ jobs: list });
}

const getJobMainList = async (req, res) => {
    const { offset, limit, jobTags } = req.query;

    const list = await jobService.getJobMainList(offset, limit, jobTags);

    res.status(200).json({ jobs: list });
}

const getJobDetailListPage = async (req, res) => {
    const { jobId } = req.params;
    const { offset, limit } = req.query;

    const detailsInfo = await jobService.getJobDetailListPage(jobId, offset, limit);

    res.status(200).json(detailsInfo);
}

module.exports = {
    getJobDetailListPage,
    getJobList,
    getJobMainList
}