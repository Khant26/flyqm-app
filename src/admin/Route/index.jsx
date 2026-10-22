import { lazy } from "react";
import { Navigate } from "react-router";
import AdminRoot from "../AdminRoot";
import AdminLayout from "../layout/AdminLayout";
import RequireAuth from "../auth/RequireAuth";
import RequireRole from "../auth/RequireRole";
const SignIn = lazy(() => import("../pages/auth/SignIn"));
const BookingManagement = lazy(() => import("../pages/booking/BookingManagement"));
const BookingView = lazy(() => import("../pages/booking/BookingView"));
const FlightManagement = lazy(() => import("../pages/flight/FlightManagement"));
const FlightForm = lazy(() => import("../pages/flight/FlightForm"));
const FlightView = lazy(() => import("../pages/flight/FlightView"));
const UserManagement = lazy(() => import("../pages/user/UserManagement"));
const UserView = lazy(() => import("../pages/user/UserView"));
const UserEdit = lazy(() => import("../pages/user/UserEdit"));
const StaffManagement = lazy(() => import("../pages/staff/StaffManagement"));
const StaffForm = lazy(() => import("../pages/staff/StaffForm"));
const StaffView = lazy(() => import("../pages/staff/StaffView"));
const StaffEdit = lazy(() => import("../pages/staff/StaffEdit"));
const FlightOverride = lazy(() => import("../pages/flight/FlightOverride"));
const BookingEdit = lazy(() => import("../pages/booking/BookingEdit"));
const ContentManagement = lazy(() => import("../pages/content/ContentManagement"));

// Mounted under "/admin" by the app router (src/Routes/routes.jsx).
// AdminRoot provides the admin auth context and scopes admin styles.
export const adminRoutes = {
  path: "/admin",
  element: <AdminRoot />,
  children: [
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="bookings" replace />,
      },
      {
        path: "bookings",
        element: <BookingManagement />,
      },
      {
        path: "bookings/:bookingId",
        element: <BookingView />,
      },
      {
        path: "bookings/:bookingId/booking-edit",
        element: <BookingEdit />,
      },
      {
        path: "flights",
        element: <FlightManagement />,
      },
      {
        path: "flights/:flightId",
        element: <FlightView />,
      },
      {
        path: "flights/:flightId/flight-edit",
        element: <FlightForm />,
      },
      {
        path: "overrides",
        element: <FlightOverride />,
      },
      {
        path: "users/:id/edit",
        element: (
          <RequireRole role="SUPER_ADMIN">
            <UserEdit />
          </RequireRole>
        ),
      },
      {
        path: "users/:id",
        element: (
          <RequireRole role="SUPER_ADMIN">
            <UserView />
          </RequireRole>
        ),
      },
      {
        path: "users",
        element:(
          <RequireRole role="SUPER_ADMIN">      
            <UserManagement />
          </RequireRole>
        ),      
      },
      {
        path: "staff",
        element: (
          <RequireRole role="SUPER_ADMIN">
            <StaffManagement />
          </RequireRole>
        ),
      },
      {
        path: "staff/staff-form",
        element: (
          <RequireRole role="SUPER_ADMIN">
            <StaffForm />
          </RequireRole>
        ),
      },
      {
        path: "staff/:id",
        element: (
          <RequireRole role="SUPER_ADMIN">
            <StaffView />
          </RequireRole>
        ),
      },
      {
        path: "staff/:id/edit",
        element: (
          <RequireRole role="SUPER_ADMIN">
            <StaffEdit />
          </RequireRole>
        ),
      },
      {
        path: "content",
        element: <ContentManagement />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/admin" replace />,
  },
  ],
};
