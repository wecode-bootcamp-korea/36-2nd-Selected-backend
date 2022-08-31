-- migrate:up
CREATE TABLE job_groups (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_group VARCHAR(100)
);

CREATE TABLE job_positions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    position VARCHAR(100)
);

CREATE TABLE specialty_areas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    work_years VARCHAR(100),
    job_group_id int ,
    job_position_id int,
    user_id int NOT NULL,
    CONSTRAINT specialty_areas_job_group_id_job_groups_id_fkey FOREIGN KEY (job_group_id) REFERENCES job_groups(id),
    CONSTRAINT specialty_areas_job_position_id_job_positions_id_fkey FOREIGN KEY (job_position_id) REFERENCES job_positions(id),
    CONSTRAINT specialty_areas_user_id_users_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE specialty_areas_skills (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    specialty_area_id int NOT NULL,
    skill_id int NOT NULL,
    CONSTRAINT specialty_areas_skills_unique UNIQUE (specialty_area_id, skill_id),
    CONSTRAINT specialty_areas_skills_specialty_area_id_specialty_areas_id_fkey FOREIGN KEY (specialty_area_id) REFERENCES specialty_areas(id) ON DELETE CASCADE,
    CONSTRAINT specialty_areas_skills_skill_id_skills_id_fkey FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);
-- migrate:down
DROP TABLE job_groups
DROP TABLE job_positions
DROP TABLE specialty_areas
DROP TABLE specialty_areas_skills

