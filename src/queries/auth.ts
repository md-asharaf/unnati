import instance from "@/lib/axios"

export const login = async (email:string) => {
    const response =  await instance.post('/auth/login', {email});
    return response.data;
}

export const verifyLogin = async (email:string,otp:string) => {
    const response =  await instance.post('/auth/login/verify', {email, otp});
    return response.data;
}

export const getMe = async () => {
    const response =  await instance.get('/me');
    return response.data;
}
