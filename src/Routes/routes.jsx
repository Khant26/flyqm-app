import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home.jsx";
import Layout from "../Layout.jsx";
import Booking from "../Pages/Booking.jsx";
import SignIn from "../Pages/SignIn.jsx";
import Departure from "../Pages/Departure.jsx";
import Return from "../Pages/Return.jsx";
import RoundTrip from "../Pages/RoundTrip.jsx";
import OneWay from "../Pages/OneWay.jsx";
import Profile from "../Pages/Profile.jsx";
import EditInfo from "../components/EditInfo.jsx";
import VerifyEmail from "../Pages/VerifyEmail.jsx";
import ForgotPassword from "../Pages/ForgotPassword.jsx";
import ResetPassword from "../Pages/ResetPassword.jsx";
import BookingView from "../Pages/BookingView.jsx";
import NotFound from "../Pages/NotFound.jsx";
import { adminRoutes } from "../admin/Route/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/departure",
        Component: Departure,
      },
      {
        path: "/round-trip",
        Component: RoundTrip,
      },
      {
        path: "/one-way",
        Component: OneWay,
      },
      {
        path: "/return",
        Component: Return,
      },
      {
        path: "/booking",
        Component: Booking,
      },
      {
        path: "/sign-in",
        Component: SignIn,
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/bookings/:bookingId",
        Component: BookingView,
      },
      {
        path: "/edit-info",
        Component: EditInfo,
      },
      {
        path: "/verify-email",
        Component: VerifyEmail,
      },
      {
        path: "/forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "/reset-password",
        Component: ResetPassword,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
  // Admin dashboard: /admin, /admin/signin, /admin/bookings, ...
  adminRoutes,
]);

export default router;