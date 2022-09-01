-- migrate:up
CREATE TABLE resumes_skills (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
skill_id INT NOT NULL,
resumes_id INT NOT NULL,
CONSTRAINT resumes_skills_unique UNIQUE (skill_id, resumes_id),
CONSTRAINT resumes_skills_skill_id_skills_id_fkey FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
CONSTRAINT resumes_skills_resumes_id_resumes_id_fkey FOREIGN KEY (resumes_id) REFERENCES resumes(id) ON DELETE CASCADE
);

-- migrate:down
