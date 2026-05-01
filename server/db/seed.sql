-- Insert user
INSERT INTO caseforge.users (email)
VALUES ('test@example.com')
RETURNING id;


-- Insert institution ()
INSERT INTO caseforge.institutions (institution_name, country)
VALUES ('Homestay University', 'USA')
RETURNING id;

-- Assume institution_id = 1

-- Insert project
INSERT INTO caseforge.projects (
  user_id,
  institution_id,
  project_name,
  first_name,
  last_name,
  research_area,
  orcid,
  career_stage,
  target
)
VALUES (
  1,
  1,
  'Bobo''s Impact Analysis',
  'Bobo',
  'Wang',
  'Human Supervisor',
  '0000-0002-2164-6551',
  'Professor',
  'EB1A'
);
