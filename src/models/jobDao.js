const { AppDataSource } = require('./dataSource');
const AppError = require('../middlewares/appError');

const getJobList = async (offset, limit) => {
    try {
        return await AppDataSource.query(`
            SELECT
                id AS jobId,
                company_name AS companyName,
                department,
                main_image_url AS mainImageUrl
            FROM jobs
            ORDER BY id ASC LIMIT ${limit} OFFSET ${offset};
        `)
    } catch (err) {
        throw new AppError('INTERNAL_SERVER_ERROR', 500);
    }
}

const getJobListByTags = async (offset, limit, jobTags) => {
    try {
        return await AppDataSource.query(`
            SELECT DISTINCT
                jobs.id AS jobId,
                jobs.company_name AS companyName,
                jobs.department,
                jobs.main_image_url AS mainImageUrl,
                tags.tag
            FROM jobs
            INNER JOIN jobs_tags ON jobs.id = jobs_tags.job_id
            INNER JOIN tags ON jobs_tags.tag_id = tags.id
            WHERE jobs_tags.tag_id = ${jobTags}
            ORDER BY jobs.id ASC LIMIT ${limit} OFFSET ${offset}
        `)
    } catch (err) {
        throw new AppError('INTERNAL_SERVER_ERROR', 500);
    }
}

const getJobListByCategory = async (offset, limit, jobSort) => {
    try {
        return await AppDataSource.query(`
            SELECT  DISTINCT
            jobs.id AS jobId,
                jobs.company_name AS companyName,
                jobs.department,
                jobs.main_image_url AS mainImageUrl,
                job_categories.category AS category,
                job_categories.category
            FROM jobs
            INNER JOIN job_categories ON job_categories.id = jobs.job_category_id
            WHERE jobs.job_category_id = ${jobSort}
            ORDER BY jobs.id ASC LIMIT ${limit} OFFSET ${offset};
        `)
    } catch (err) {
        throw new AppError('INTERNAL_SERVER_ERROR', 500);
    }
}

const getJobListByTagAndCategory = async (offset, limit, jobTags, jobSort) => {
    try {
        return await AppDataSource.query(`
            SELECT  DISTINCT
                jobs.id AS jobId,
                jobs.company_name AS companyName,
                jobs.department,
                jobs.main_image_url AS mainImageUrl,
                job_categories.category,
                tags.tag
            FROM jobs
            INNER JOIN jobs_tags ON jobs.id = jobs_tags.job_id
            INNER JOIN tags ON jobs_tags.tag_id = tags.id
            INNER JOIN job_categories ON job_categories.id = jobs.job_category_id
            WHERE (jobs_tags.tag_id = ${jobTags} AND jobs.job_category_id = ${jobSort})
            ORDER BY jobs.id ASC LIMIT ${limit} OFFSET ${offset};
        `)
    } catch (err) {
        throw new AppError('INTERNAL_SERVER_ERROR', 500);
    }
}

module.exports = {
    getJobList,
    getJobListByTags,
    getJobListByCategory,
    getJobListByTagAndCategory
}