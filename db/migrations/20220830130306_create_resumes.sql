-- migrate:up
CREATE TABLE resumes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    introduction TEXT,
    user_id INT NOT NULL,
    CONSTRAINT resumes_user_id_users_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE portfolio_urls (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    link_url TEXT,
    resumes_id INT NOT NULL,
    CONSTRAINT profile_image_urls_resumes_id_resumes_id_fkey FOREIGN KEY (resumes_id) REFERENCES resumes(id) ON DELETE CASCADE
);

CREATE TABLE user_careers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    career_start date,
    career_end date,
    company_name VARCHAR(100),
    department VARCHAR(100),
    resumes_id INT NOT NULL,
    CONSTRAINT user_careers_resumes_id_resumes_id_fkey FOREIGN KEY (resumes_id) REFERENCES user_careers(id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE resumes
DROP TABLE portfolio_urls
DROP TABLE user_careers