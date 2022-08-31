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

const getJobDetailList = async (jobId, offset, limit) => {
    try {
        const [jobInfo] = await AppDataSource.query(`
            SELECT
                id AS jobsId,
                company_name AS companyName,
                department,
                location,
                deadline,
                introduction,
                main_image_url AS mainImageUrl
            FROM jobs
            WHERE jobs.id = ${jobId}
            `);
        return jobInfo;
    } catch (err) {
        throw new AppError('INVALID_DATA', 500);
    }
}

const getSubImage = async (jobId) => {
    try {
        const subImage = await AppDataSource.query(`
            SELECT
                id AS subImageId,
                job_id AS jobId,
                image_url AS subImageUrl
            FROM sub_images
            WHERE job_id = ${jobId}
            `);
        return subImage;
    } catch (err) {
        throw new AppError('INVALID_DATA', 500);
    }
}

const getJobTags = async (jobId) => {
    try {
        const jobTags = await AppDataSource.query(`
            SELECT DISTINCT
                tags.id AS tagId,
                tags.tag
            FROM tags
            INNER JOIN jobs_tags ON tags.id = jobs_tags.tag_id
            WHERE jobs_tags.job_id = ${jobId}
            `);
        return jobTags;
    } catch (err) {
        throw new AppError('INVALID_DATA', 500);
    }
}

const getJobSkills = async (jobId) => {
    try {
        const jobSkills = await AppDataSource.query(`
            SELECT
                skills.id AS skillId,
                skill
            FROM skills
            INNER JOIN jobs_skills ON jobs_skills.skill_id = skills.id
            WHERE jobs_skills.job_id = ${jobId};
            `);
        return jobSkills;
    } catch (err) {
        throw new AppError('INVALID_DATA', 500);
    }
}

const getJobRecomendations = async (offset, limit) => {
    try {
        const jobRecomendations = await AppDataSource.query(`
            SELECT DISTINCT
                id AS jobId,
                company_name AS companyName,
                main_image_url AS mainImageUrl,
                department
            FROM jobs
            ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}
            `);
        return jobRecomendations;
    } catch (err) {
        throw new AppError('INVALID_DATA', 500);
    }
}

const getJobById = async (jobId) => {
    const [job] = await AppDataSource.query(`
        SELECT
            id,
            company_name,
            department,
            job_category_id
        FROM jobs
        WHERE id = ?`,
        [jobId]
    );
    return job;
}

module.exports = {
    getJobDetailList,
    getJobById,
    getSubImage,
    getJobTags,
    getJobSkills,
    getJobRecomendations,
    getJobList,
    getJobListByTags,
    getJobListByCategory,
    getJobListByTagAndCategory
}