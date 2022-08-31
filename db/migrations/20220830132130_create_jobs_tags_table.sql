-- migrate:up
CREATE TABLE tags (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tag VARCHAR(100) NOT NULL
);

CREATE TABLE jobs_tags (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_id int NOT NULL,
    tag_id int NOT NULL,
    CONSTRAINT jobs_tags_unique UNIQUE (job_id, tag_id),
    CONSTRAINT jobs_tags_job_id_jobs_id_fkey FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    CONSTRAINT jobs_tags_tag_id_tags_id_fkey FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE tags
DROP TABLE jobs_tags