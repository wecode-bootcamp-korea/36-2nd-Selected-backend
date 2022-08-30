-- migrate:up
CREATE TABLE application_statuses (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    application_status VARCHAR(100)
);

CREATE TABLE applications (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    job_id INT NOT NULL,
    application_status_id INT NOT NULL,
    CONSTRAINT applications_unique UNIQUE (user_id, job_id, application_status_id),
    CONSTRAINT applications_user_id_users_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT applications_job_id_jobs_id_fkey FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    CONSTRAINT applications_application_status_id_application_statuses_id_fkey FOREIGN KEY (application_status_id) REFERENCES application_statuses(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE applications
DROP TABLE application_statuses

