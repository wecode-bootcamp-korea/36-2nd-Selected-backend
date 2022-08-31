-- migrate:up
ALTER TABLE users RENAME COLUMN kakao_id TO client_id

-- migrate:down

