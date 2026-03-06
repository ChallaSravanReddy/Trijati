-- Run this SQL script in your PostgreSQL database to create the survey_responses table

CREATE DATABASE tanmaya;

\c tanmaya;

CREATE TABLE IF NOT EXISTS survey_responses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  age_group VARCHAR(50),
  gender VARCHAR(50),
  shopping_platform TEXT[],
  biggest_problem TEXT,
  shopping_frequency VARCHAR(100),
  ai_interest VARCHAR(100),
  early_customer BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
