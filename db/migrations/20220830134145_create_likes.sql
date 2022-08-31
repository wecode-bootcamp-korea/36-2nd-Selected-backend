-- migrate:up
CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id int NOT NULL,
    job_id int NOT NULL,
    CONSTRAINT likes_unique UNIQUE (user_id, job_id),
    CONSTRAINT likes_user_id_users_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT likes_job_id_jobs_id_fkey FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

CREATE TABLE bookmarks (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id int NOT NULL,
    job_id int NOT NULL,
    CONSTRAINT bookmarks_unique UNIQUE (user_id, job_id),
    CONSTRAINT bookmarks_user_id_users_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT bookmarks_job_id_jobs_id_fkey FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE likes
DROP TABLE bookmarks

