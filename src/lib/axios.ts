import axios from "axios"
import { getAccessToken, removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken } from "./cookies";

const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Set Authorization header before each request using cookie
instance.interceptors.request.use(config => {
    const token = getAccessToken()
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 errors and refresh token
instance.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            try {
                const res = await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });
                if (res.ok) {
                    const data = await res.json();
                    setAccessToken(data.accessToken);
                    setRefreshToken(data.refreshToken);
                    // Retry original request with new token
                    error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;
                    return instance(error.config);
                }
            } catch (err) {
                removeAccessToken();
                removeRefreshToken();
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
