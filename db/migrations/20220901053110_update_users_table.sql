-- migrate:up
ALTER TABLE users RENAME COLUMN client_id TO kakao_id;

-- migrate:down

