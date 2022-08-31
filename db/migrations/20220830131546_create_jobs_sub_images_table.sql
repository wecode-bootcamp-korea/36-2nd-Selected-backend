-- migrate:up
CREATE TABLE sub_images (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_id int NOT NULL,
    image_url TEXT NOT NULL,
    CONSTRAINT sub_images_job_id_jobs_id_fkey FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
)

-- migrate:down
DROP TABLE sub_images