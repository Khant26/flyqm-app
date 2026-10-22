import { Suspense } from "react";
import { Outlet } from "react-router";
import { AdminAuthProvider } from "./contexts/AuthContext";
import "./admin.css";

// Root element for every /admin/* route: own auth context (separate from the
// customer AuthProvider) and a wrapper class that scopes admin-only CSS.
export default function AdminRoot() {
  return (
    <AdminAuthProvider>
      <div className="flyqm-admin">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen text-gray-600">
              Loading...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </AdminAuthProvider>
  );
}
