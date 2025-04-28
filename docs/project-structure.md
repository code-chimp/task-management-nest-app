# Project Structure Guide

This document provides an overview of the folder and file structure of the Task Management NestJS application.

## Root Directory
- `dev.http` — HTTP request samples for development/testing
- `docker-compose.yml` — Docker Compose configuration for services (e.g., PostgreSQL)
- `eslint.config.mjs` — ESLint configuration
- `LICENSE` — Project license
- `nest-cli.json` — NestJS CLI configuration
- `package.json` — Project dependencies and scripts
- `README.md` — Project overview and setup instructions
- `tsconfig*.json` — TypeScript configuration files

## Folders
- `data/` — Database initialization scripts
  - `init.sql` — SQL for setting up the database schema
- `docs/` — Project documentation
  - `nest-js.md` — Notes on NestJS
  - `quick-start.md` — Quick start guide
  - `project-structure.md` — (this file)
- `src/` — Application source code
  - `app.module.ts` — Root module
  - `main.ts` — Application entry point
  - `@enums/` — Shared enums (e.g., HTTP status codes, task status)
  - `auth/` — Authentication module
    - Controllers, services, DTOs, decorators, interfaces, and constants for auth
  - `data/` — Data access layer
    - `dao/` — Entity definitions (e.g., `task.entity.ts`, `user.entity.ts`)
    - `repositories/` — Custom repositories for data access
  - `interceptors/` — Global and route-specific interceptors
  - `tasks/` — Task management module
    - Controllers, services, DTOs for tasks
- `test/` — End-to-end tests and test configuration

---

For more details on each module or file, see the inline comments in the source code or other documentation in the `docs/` folder.
