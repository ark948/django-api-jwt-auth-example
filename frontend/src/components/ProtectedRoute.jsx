import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

// a wrapper for a protected route
// if a route is wrapped in this, it is protected...
// and it needs authorization header before it can be accessed

function ProtectedRoute({children}) {
    // need to check if we are authorized before allowing access
    // otherwise redirect to login
    const [isAuthorized, setIsAuthorized] = useState(null);

    // as soon as a protected route is rendered, call auth function
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);
    const refreshToken = async () => {
        // automatically refresh the access token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            // sending the refresh token to backend to get a new access token
            const res = await api.post("/api/token/refresh/", {refresh: refreshToken});
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        // checks if refreshing the token is needed
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;
        if (tokenExpiration < now) {
            // if token is expired
            await refreshToken()
        } else {
            // if token is not expired
            setIsAuthorized(true)
        }
    };

    if (isAuthorized === null) {
        return(
            <div>Loading...</div>
        );
    }

    return(
        isAuthorized ? children : <Navigate to="/login" />
    );
}

export default ProtectedRoute