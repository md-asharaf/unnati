import instance from "@/lib/axios"

const login = async (email: string) => {
    try {
        const response = await instance.post('/auth/login', { email });
        return response.data;
    } catch (e) {
        return null;
    }
}

const verifyLogin = async (email: string, otp: string) => {
    try {
        const response = await instance.post('/auth/login/verify', { email, otp });
        return response.data;
    } catch (e) {
        return null;
    }
}

const getMe = async () => {
    try {
        const response = await instance.post('/me');
        return response.data;
    } catch (e) {
        return null;
    }
}

const refreshTokens = async () => {
    try {
        const response = await instance.post('/auth/refresh', {}, { withCredentials: true });
        return response.data;
    } catch (e) {
        return null;
    }
}

export {
    login,
    verifyLogin,
    getMe,
    refreshTokens
}
