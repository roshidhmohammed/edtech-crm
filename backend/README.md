# Edtech CRM and Inquiry System

## Run the backend locally

### Prerequisites

- Node.js - version (v24 +)
- pnpm (the backend uses pnpm), version -(11 +)
- A PostgreSQL database with the application schema initialized

### Install and start

From the project root:

```powershell
cd backend
pnpm install
```

Create `backend/.env.development` as described in [Environment variables](#environment-variables-setup), then start the API:

```powershell
pnpm dev
```

The server checks its database connection before listening. Set `PORT` in the environment file; for example, use `8000`. The health check is available at `http://localhost:8000/health`.

To create the initial admin account, configure `ADMIN_PASSWORD` and run this once against an initialized database:

```powershell
pnpm seed
```

The seeded account uses `admin@example.com`. The seed script creates a new user, so do not rerun it if that email already exists.

## Environment variables setup

The backend loads `.env.development` when running in development and `.env.production` when `NODE_ENV=production`. Place the selected file in the `backend` directory. For local development, create `backend/.env.development`:

```env
NODE_ENV=development
PORT=8000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_PASSWORD=replace-with-a-strong-admin-password
```

- `DATABASE_URL`: PostgreSQL connection string for the database containing the application tables.
- `JWT_SECRET`: secret used to sign and verify admin JWTs. Keep it private and use the same value wherever the app runs.
- `ADMIN_PASSWORD`: password for the seeded admin. It must be 8–25 characters, include uppercase and lowercase letters and a digit, contain no spaces, and must not be `Password123` or `Admin123`.
- `PORT`: port the backend listens on.
- `NODE_ENV`: selects the environment file; local development uses `development`.

Do not commit environment files or put real credentials in source control.

## Test the custom JWT auth

The admin login endpoint issues a JWT in the `accessToken` cookie. The token is signed with `JWT_SECRET`, contains the admin role, and expires after one day. Protected requests must send that cookie. The middleware verifies the token and looks up the user in the database.

Start the backend and use PowerShell to log in. `-SessionVariable` stores the response cookie for subsequent requests:

```powershell
$body = @{
  email = "admin@example.com"
  password = "YOUR_ADMIN_PASSWORD"
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "http://localhost:8000/api/admin/login" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body `
  -SessionVariable authSession
```

Use the session to call a protected endpoint:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:8000/api/admin/profile" `
  -Method Get `
  -WebSession $authSession
```

The authenticated inquiry endpoints can be tested the same way:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:8000/api/inquiries/stats" `
  -Method Get `
  -WebSession $authSession
```

To confirm the authentication requirement, call a protected endpoint without `-WebSession`; it should reject the request with `401`. A valid token with a non-admin role is rejected with `403`.
