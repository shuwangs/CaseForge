CREATE SCHEMA IF NOT EXISTS caseforge;
SET search_path TO caseforge;

DROP TABLE IF EXISTS citation_record_institutions CASCADE;
DROP TABLE IF EXISTS citation_records CASCADE;
DROP TABLE IF EXISTS institutions CASCADE;
DROP TABLE IF EXISTS publications CASCADE;
DROP TABLE IF EXISTS summaries CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS users CASCADE;


-- Table users
-- clerk_id can be null before authentication is added
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  clerk_id VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table institutions
CREATE TABLE institutions (
  id SERIAL PRIMARY KEY,
  institution_name TEXT NOT NULL,
  country VARCHAR(255),
  institution_type VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_institution_country
    UNIQUE (institution_name, country)
);


-- Table project 
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_name VARCHAR(255) NOT NULL,
  institution_id INT REFERENCES institutions(id) ON DELETE SET NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  research_area VARCHAR(100),
  orcid VARCHAR(50),
  career_stage VARCHAR(100),
  target VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- Table publications
CREATE TABLE publications (
  id SERIAL PRIMARY KEY,
  project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  authors TEXT,
  publication_type VARCHAR(100),
  publication_date DATE,

  doi VARCHAR(255),
  openalex_id VARCHAR(255),
  pmid VARCHAR(50),

  journal_name TEXT,
  journal_issns VARCHAR(255),
  journal_openalex VARCHAR(20),

  publisher_name TEXT,
  publisher_crossrefId VARCHAR(10),

  raw_data JSONB,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table citation_records
CREATE TABLE citation_records (
  id SERIAL PRIMARY KEY,
  publication_id INT NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
  citing_title TEXT,
  citing_authors TEXT,
  citing_journal TEXT,
  citing_year INT,

  citing_type VARCHAR(255),
  doi VARCHAR(255),
  openalex_id VARCHAR(255),
  pmid VARCHAR(50),
  raw_data JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unique_publication_citation_openalex 
    UNIQUE (publication_id, openalex_id)
);

-- Table summaries
CREATE TABLE summaries (
  id SERIAL PRIMARY KEY,
  project_id INT NOT NULL UNIQUE REFERENCES projects(id) ON DELETE CASCADE,
  ai_overview TEXT,
  ai_trend TEXT,
  ai_geographic TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table junction
CREATE TABLE citation_record_institutions (
    citation_record_id INT NOT NULL REFERENCES citation_records(id) ON DELETE CASCADE,
    institution_id INT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    PRIMARY KEY (citation_record_id, institution_id)
);
