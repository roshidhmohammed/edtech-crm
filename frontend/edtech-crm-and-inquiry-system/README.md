# EdTech CRM and Inquiry System

An inquiry submission site and admin dashboard built with React, Vite, Express, and PostgreSQL.

## Requirements

- Node.js
- pnpm
- PostgreSQL 15 or newer

## Run locally

Open two terminals from the repository root.

### 1. Configure and run the backend

```powershell
cd backend
pnpm install
Copy-Item .env.example .env.development
```

Edit `backend/.env.development` and set the values described below. Make sure the PostgreSQL database exists and its schema has been initialized before starting the API.

Start the API:

```powershell
pnpm dev
```

The backend listens on port `8000` by default. Keep this terminal running.

### 2. Configure and run the frontend

In the second terminal, from the repository root:

```powershell
cd frontend/edtech-crm-and-inquiry-system
pnpm install
Copy-Item .env.example .env
```

Set `VITE_BACKEND_URL` in `frontend/edtech-crm-and-inquiry-system/.env` to:

```env
VITE_BACKEND_URL="http://localhost:8000/api"
```

Start the frontend:

```powershell
pnpm dev
```

Open the local URL printed by Vite (by default, `http://localhost:5173`). The admin login page is at `/admin/login`.

## Environment variables

### Backend: `backend/.env.development`

Copy `backend/.env.example` to `backend/.env.development` and provide:

| Variable | Description |
| --- | --- |
| `NODE_ENV` | Use `development` for local work. |
| `PORT` | Backend port; use `8000` for the frontend URL above. |
| `DATABASE_URL` | PostgreSQL connection string. |
| `ADMIN_PASSWORD` | Strong password used when seeding the local admin account. |
| `JWT_SECRET` | Secret used to sign and verify admin authentication tokens. |

Keep database credentials, admin passwords, and JWT secrets private. Do not commit environment files.

To create the default local admin account after the database schema is initialized:

```powershell
cd backend
pnpm seed
```

The seeded account email is `admin@example.com`; its password is the `ADMIN_PASSWORD` value.

### Frontend: `frontend/edtech-crm-and-inquiry-system/.env`

Copy `.env.example` to `.env` and set:

| Variable | Description |
| --- | --- |
| `VITE_BACKEND_URL` | Backend API base URL, including `/api`; locally use `http://localhost:8000/api`. |

Vite reads frontend environment variables when it starts. Restart the dev server after changing `.env`.

## Useful frontend commands

Run these from `frontend/edtech-crm-and-inquiry-system`:

```powershell
pnpm dev       # Start the Vite development server
pnpm build     # Type-check and create the production bundle
pnpm preview   # Preview the production bundle locally
pnpm lint      # Run ESLint
```
