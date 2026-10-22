# FlyQM

FlyQM is a responsive airline search and booking app for flights across Myanmar and the region. This repository holds a single React app with two parts:

- **Customer site** at `/`, for searching, booking and managing tickets.
- **Admin dashboard** at `/admin`, for bookings, flights, price overrides, users, staff and content. Only admin and staff accounts can sign in.

**Live:** https://flyqm.com/en

## Branches

| Branch | Contents |
|---|---|
| `main` | React app (customer site and admin dashboard) |
| `backend` | FastAPI booking and pricing service (Docker) |
| `api` | Older copy of the FastAPI service (same code as the one `backend` was made from) |

## Routes

### Customer (`/`), using `src/Routes/routes.jsx` and `src/Pages/*`

| Path | Page |
|---|---|
| `/` | Home and flight search |
| `/departure`, `/return` | Picking outbound and return flights |
| `/one-way`, `/round-trip` | Search results |
| `/booking` | Booking and passenger form |
| `/sign-in` | Customer sign-in and sign-up |
| `/profile`, `/edit-info` | Profile and contact info |
| `/bookings/:bookingId` | Booking details and ticket |
| `/verify-email`, `/forgot-password`, `/reset-password` | Account e-mail flows |
| `*` | Not found page |

### Admin (`/admin`), using `src/admin/**`

| Path | Page | Access |
|---|---|---|
| `/admin/signin` | Admin and staff sign-in | public |
| `/admin` | Redirects to `/admin/bookings` | signed in |
| `/admin/bookings`, `/admin/bookings/:bookingId`, `/admin/bookings/:bookingId/booking-edit` | Bookings | signed in |
| `/admin/flights`, `/admin/flights/:flightId`, `/admin/flights/:flightId/flight-edit`, `/admin/overrides` | Flights and price overrides | signed in |
| `/admin/content` | Homepage background and banners | signed in |
| `/admin/users`, `/admin/users/:id`, `/admin/users/:id/edit` | Customers | `SUPER_ADMIN` |
| `/admin/staff`, `/admin/staff/staff-form`, `/admin/staff/:id`, `/admin/staff/:id/edit` | Staff | `SUPER_ADMIN` |

The admin pages are lazy-loaded. The admin side has its own auth context (`src/admin/contexts/AuthContext.jsx`) and keeps its session in separate localStorage keys (`flyqmAdminToken` and `flyqmAdminUser`). A customer login and an admin login therefore never overwrite each other. Admin-only CSS is scoped under the `.flyqm-admin` wrapper.

## Environment variables

Copy `.env.example` to `.env` and adjust it. Never commit `.env`.

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | `/api` | Base URL of the FastAPI service, including `/api`. The customer site and the admin dashboard both use it. |
| `VITE_DEV_API_PROXY` | `http://localhost:8000` | Used only by `npm run dev`: where `/api` requests are forwarded. |

`VITE_*` values are built into the browser bundle, so never put secrets in them.

## Local development

```bash
npm ci
cp .env.example .env
npm run dev          # http://localhost:5173  (admin: http://localhost:5173/admin)
```

To run the API locally, see the `backend` branch (`docker compose` or `uvicorn`).

## Build and quality checks

```bash
npm run lint
npm run build        # output goes to dist/
npm run preview
```

GitHub Actions runs lint and the production build on every push and pull request.

## Deploying to Vercel

`vercel.json` sets the build to `npm run build` with output in `dist`. It rewrites every path to `index.html`, so deep links such as `/admin/bookings` or `/bookings/123` load correctly. In the Vercel project, set `VITE_API_BASE_URL` to the public API URL (for example `https://api.example.com/api`). The FastAPI service must also allow the Vercel domain in CORS.

## Tech stack

React 19, Vite 7, React Router 7, Tailwind CSS 4 and Axios.

## License

No open-source license has been declared. All rights are reserved unless the repository owner adds a license.
