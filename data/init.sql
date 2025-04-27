-- Create a new user
CREATE USER "tasks-admin" WITH PASSWORD 'L0w3r_4dmin';

-- Create a new database
CREATE DATABASE "task-management";

-- Grant all privileges on the new database to the new user
GRANT ALL PRIVILEGES ON DATABASE "task-management" TO "tasks-admin";
