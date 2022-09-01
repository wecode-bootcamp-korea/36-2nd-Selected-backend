-- migrate:up
ALTER TABLE specialty_areas
    DROP CONSTRAINT specialty_areas_job_position_id_job_positions_id_fkey,
    DROP job_position_id;

DROP TABLE job_positions;

-- migrate:down

