# Where2Watch - Movie Streaming Tracker

  Full‑stack app to track movies and where they are available to stream.

  ## Project Structure

  ```
  /where2watch
  ├── client/            # Frontend (React + Vite + TypeScript + Tailwind)
  │   ├── src/           # Components, hooks, services, contexts
  │   └── package.json
  ├── server/            # Backend (NestJS + TypeORM + PostgreSQL)
  │   ├── src/           # Modules, controllers, entities, config
  │   └── package.json
  └── database/          # SQL migration/seed scripts (Upgrader)
  ```

  ## Prerequisites
  - Node.js 18+ (recommended: 20+)
  - npm 9+
  - PostgreSQL 14+ running locally
  - Windows PowerShell (commands below use PowerShell)

  ## Environment Setup
  Create the following `.env` files.

  - Server: `server/.env`
  ```env
  NODE_ENV=development
  PORT=3001

  DB_HOST=localhost
  DB_PORT=5432
  DB_NAME=where2watch
  DB_USER=postgres
  DB_PASSWORD=postgres
  DB_SCHEMA=public
  RUN_UPGRADES=true  # Enables automatic database migrations and seeding
  ```

  - Client: `client/.env` (optional, defaults to the URL below)
  ```env
  VITE_API_URL=http://localhost:3001/api
  ```

  ## Install Dependencies
  ```powershell
  # Frontend
  Push-Location "c:\projects\where2watch\where2watch\client"
  npm install
  Pop-Location

  # Backend
  Push-Location "c:\projects\where2watch\where2watch\server"
  npm install
  Pop-Location
  ```

  ## Initialize Database
  1) Ensure PostgreSQL is running and the user/credentials in `server/.env` exist.
  2) Create the database if it doesn’t exist:
  ```powershell
  # Example using psql (adjust user/password as needed)
  psql -U postgres -h localhost -c "CREATE DATABASE where2watch;"
  ```
  3) Apply schema + seed data using the Upgrader:
  ```powershell
  Push-Location "c:\projects\where2watch\where2watch\server"
  npm run db:upgrade
  Pop-Location
  ```

  ### Run Upgrader with Data
  The upgrader executes SQL files in `database/upgrader` (tables + seeds) and records applied files in the `upgrade_history` table to avoid re-runs.

  - Enable upgrades via env flag (required):
  ```powershell
  # One-time in current shell
  $env:RUN_UPGRADES="true"

  Push-Location "c:\projects\where2watch\where2watch\server"
  npm run db:upgrade
  Pop-Location
  ```

  - Or add to `server/.env` permanently:
  ```env
  RUN_UPGRADES=true
  ```

  Seed files included:
  - `005_seed_streaming_sites.sql`
  - `006_seed_popular_movies.sql`
  - `007_associate_movies_with_streaming_sites.sql`

  ## Run the App (Development)
  - Start the backend (NestJS):
  ```powershell
  Push-Location "c:\projects\where2watch\where2watch\server"
  npm run dev
  Pop-Location
  # Backend runs at http://localhost:3001
  ```

  - Start the frontend (Vite + React):
  ```powershell
  Push-Location "c:\projects\where2watch\where2watch\client"
  npm run dev
  Pop-Location
  # Frontend opens at http://localhost:3000
  ```

  Access the app at http://localhost:3000. The client calls the API at http://localhost:3001/api.

## Example Users

You can use the following sample user to log in:

- **Username:** alice
- **Email:** alice@example.com
- **Password:** password123


  ## Build (Production)
  - Frontend:
  ```powershell
  Push-Location "c:\projects\where2watch\where2watch\client"
  npm run build
  Pop-Location
  # Output in client/build
  ```

  - Backend:
  ```powershell
  Push-Location "c:\projects\where2watch\where2watch\server"
  npm run build
  node dist/index.js
  Pop-Location
  ```


## Testing

All frontend tests pass:

Test Suites: 5 passed, 5 total
Tests: 15 passed, 15 total

To run all tests:
```powershell
Push-Location "c:\projects\where2watch\where2watch\client"
npm test
Pop-Location
```

To run a specific test file:
```powershell
npm test -- --testPathPattern=movie-list
```

See [docs/testing.md](docs/testing.md) for details and troubleshooting.

## Documentation
- [Authentication System](docs/auth-system.md)
- [Database & Upgrader](docs/database.md)
- [Testing](docs/testing.md)

## Running with Docker/Docker Compose

You can run the entire application (frontend, backend, database) using Docker and docker-compose.

### 1. Requirements
- Docker and Docker Compose installed

### 2. Files
- `Dockerfile` in the `server/` folder (backend)
- `Dockerfile` in the `client/` folder (frontend)
- `docker-compose.yml` in the project root

### 3. How to run
In the project root directory, run:

```bash
docker-compose up --build
```

- Frontend will be available at `http://localhost:3000`
- Backend (NestJS) at `http://localhost:3001`
- PostgreSQL database at `localhost:5432`

### 4. Automatic seeding and migrations
The backend automatically runs the upgrader script (`npm run db:upgrade`), which:
- Creates tables and database structure
- Adds sample (seed) data
- Registers applied migrations in the `upgrade_history` table

You do not need to run migrations or seeding manually – everything happens automatically when the backend container starts.

### 5. Stopping the application
To stop all containers:
```bash
docker-compose down
```

---

> **Note:** The backend automatically runs the upgrader script on container startup if the following environment flag is set in `server/.env` or via environment variables:
>
> ```env
> RUN_UPGRADES=true
> ```
>
> This ensures migrations and seeding are performed automatically. The flag is already set in the `.env` file and passed by `docker-compose.yml`.

## Attributions
- Components from [shadcn/ui](https://ui.shadcn.com/) — [MIT License](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md)
- Images from [Unsplash](https://unsplash.com) — [Unsplash License](https://unsplash.com/license)

## Copyright & Usage

This project is protected by copyright. You may only run and test the application for demonstration or evaluation purposes. Any other use, distribution, or modification without the author's permission is strictly prohibited.