import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [userRole, setUserRole] = useState(localStorage.getItem("user_role"));
    const location = useLocation(); // Get current URL
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            setIsAuthorized(false);
            return;
        }
        try {
            const res = await api.post("/api/token/refresh/", { refresh: refreshToken });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        }

        const storedRole = localStorage.getItem("user_role");
        setUserRole(storedRole);
        setIsAuthorized(true);
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    // **Redirect to login if unauthorized**
    if (!isAuthorized) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // **Redirect users to correct role-based route**
    if (userRole === "true" && !location.pathname.startsWith("/admin")) {
        return <Navigate to="/admin" replace />;
    } 
    if (userRole !== "true" && !location.pathname.startsWith("/user")) {
        return <Navigate to="/user" replace />;
    }
    

    return children;
}

export default ProtectedRoute;
