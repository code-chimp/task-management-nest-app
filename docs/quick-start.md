# Quick Start Guide

This guide will help you get started with developing the Task Management NestJS application.

## Prerequisites
- [Node.js](https://nodejs.org/) (v22 or higher recommended)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## 1. Clone the Repository
```bash
git clone https://github.com/code-chimp/task-management-nest-app
cd task-management-nest-app
```

## 2. Start Required Services with Docker Compose
The application uses PostgreSQL as its database. Start the database service using Docker Compose:

```bash
docker compose up -d
```

This will start the PostgreSQL database defined in `docker-compose.yml`.

## 3. Install Dependencies
```bash
npm install
```

## 4. Run the Application in Development Mode
```bash
npm run start:dev
```

The application will be available at `http://localhost:3001` by default.

## 5. Stopping Services
To stop the database and other services started by Docker Compose:

```bash
docker compose down
```

---

For more details, see the [README.md](../README.md).
