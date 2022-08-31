-- migrate:up
ALTER TABLE resumes DROP user_id;

ALTER TABLE resumes
    ADD COLUMN user_id INT NOT NULL,
    ADD CONSTRAINT resumes_user_id_users_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    ADD deleted_time TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- migrate:down

