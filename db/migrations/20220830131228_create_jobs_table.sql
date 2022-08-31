-- migrate:up
CREATE TABLE job_categories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100) NOT NULL
);

CREATE TABLE jobs (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    deadline VARCHAR(100),
    introduction TEXT NOT NULL,
    main_image_url TEXT,
    job_category_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT jobs_job_category_id_job_categories_id_fkey FOREIGN KEY (job_category_id) REFERENCES job_categories(id)
);

-- migrate:down
DROP TABLE job_categories
DROP TABLE jobs