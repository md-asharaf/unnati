import instance from "@/lib/axios"

const login = async (email: string) => {
    const response = await instance.post('/auth/login', { email });
    return response.data;
}

const verifyLogin = async (email: string, otp: string) => {
    const response = await instance.post('/auth/login/verify', { email, otp });
    return response.data;
}

const logout = async () => {
    const response = await instance.post('/auth/logout');
    return response.data;
}

const getMe = async () => {
    const response = await instance.get('/me');
    return response.data;
}

const refreshTokens = async () => {
    const response = await instance.post('/auth/refresh');
    return response.data;
}

export {
    login,
    logout,
    verifyLogin,
    getMe,
    refreshTokens
}
