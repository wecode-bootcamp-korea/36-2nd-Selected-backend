-- migrate:up
ALTER TABLE applications
    ADD COLUMN resume_id INT NOT NULL,
    ADD CONSTRAINT applications_resume_id_resumes_id_fkey FOREIGN KEY (resume_id) REFERENCES resumes(id)


-- migrate:down

