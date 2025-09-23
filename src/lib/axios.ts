import { refreshTokens } from "@/queries/auth";
import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// handle 401 responses and try to refresh the token
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      await refreshTokens()
      return instance(error.config);
    }
    return Promise.reject(error);
  }
);

export default instance;
