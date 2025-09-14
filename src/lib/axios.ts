import axios from "axios"
import { getAccessToken, getRefreshToken, removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken } from "./cookies";
import { refreshTokens } from "@/queries/auth";

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
        if (error.response?.status === 401 && getRefreshToken()) {
            try {
                const { data } = await refreshTokens();
                setAccessToken(data.accessToken);
                setRefreshToken(data.refreshToken);
                // Retry original request with new token
                error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;
                return instance(error.config);
            } catch (err) {
                removeAccessToken();
                removeRefreshToken();
            }
        }
        return Promise.reject(error);
    }
);

export default instance;