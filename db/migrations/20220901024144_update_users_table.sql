-- migrate:up
ALTER TABLE users 
MODIFY COLUMN client_id BIGINT NOT NULL,
ADD COLUMN work_years VARCHAR(100)

-- migrate:down
