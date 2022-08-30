-- migrate:up
CREATE TABLE skills (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    skill VARCHAR(100) NOT NULL
);

CREATE TABLE jobs_skills (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    skill_id INT NOT NULL,
    job_id INT NOT NULL,
    CONSTRAINT jobs_skills_skill_id_skills_id_fkey FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    CONSTRAINT jobs_skills_job_id_jobs_id_fkey FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    CONSTRAINT jobs_skills_unique UNIQUE (skill_id, job_id)
);

CREATE TABLE users_skills (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    skill_id int NOT NULL,
    user_id int NOT NULL,
    CONSTRAINT users_skills_unique UNIQUE (skill_id, user_id),
    CONSTRAINT users_skills_skill_id_skills_id_fkey FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    CONSTRAINT users_skills_user_id_users_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE skills
DROP TABLE jobs_skills
DROP TABLE users_skills
