import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute() {
    const token = Cookies.get("desimates_admin_token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}