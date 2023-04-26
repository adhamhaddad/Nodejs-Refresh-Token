SET client_min_messages = warning;
-- -------------------------
-- Database authentication
-- -------------------------
DROP DATABASE IF EXISTS authentication;
--
--
CREATE DATABASE authentication;
-- -------------------------
-- Database authentication_test
-- -------------------------
DROP DATABASE IF EXISTS authentication_test;
--
--
CREATE DATABASE authentication_test;
-- -------------------------
-- Role admin
-- -------------------------
DROP ROLE IF EXISTS admin;
--
--
CREATE ROLE admin WITH PASSWORD 'admin';
-- -------------------------
-- Alter Role admin
-- -------------------------
ALTER ROLE admin WITH SUPERUSER CREATEROLE CREATEDB LOGIN;
-- -------------------------
-- Database GRANT PRIVILEGES
-- -------------------------
GRANT ALL PRIVILEGES ON DATABASE authentication TO admin;
GRANT ALL PRIVILEGES ON DATABASE authentication_test TO admin;
-- -------------------------
-- Connect to authentication database
-- -------------------------
\c authentication;
-- -------------------------
-- Table users
-- -------------------------
DROP TABLE IF EXISTS users;
--
--
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATE,
    deleted_at DATE
);