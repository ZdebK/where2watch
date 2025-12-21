
  # Where2Watch - Movie Streaming Tracker

  Full-stack application for tracking movies and their streaming availability.

  ## Project Structure

  ```
  /where2watch
  ├── /client          # Frontend (React + Vite + TypeScript)
  │   ├── /src         # React components, services, contexts
  │   └── package.json
  ├── /server          # Backend (Express + TypeORM + PostgreSQL)
  │   ├── /src         # Entities, routes, services, config
  │   └── package.json
  └── /database        # SQL migration scripts
  ```

  ## Quick Start

  **Backend:**
  ```bash
  cd server
  npm install
  npm run dev  # http://localhost:3001
  ```

  **Frontend:**
  ```bash
  cd client
  npm install
  npm run dev  # http://localhost:5173
  ```

  ## Documentation

  - [**Authentication System**](docs/auth-system.md) - JWT tokens, Auth Context, Security setup
  - [**Database & Upgrader**](docs/database.md) - SQL migrations, schema management
  - [**Testing**](docs/testing.md) - Unit tests, database connection tests

  ## Attributions

  This project uses:
  - Components from [shadcn/ui](https://ui.shadcn.com/) - [MIT License](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md)
  - Images from [Unsplash](https://unsplash.com) - [Unsplash License](https://unsplash.com/license)
  