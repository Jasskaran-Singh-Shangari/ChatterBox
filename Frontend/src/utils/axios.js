import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://chatter-box-qvoy.onrender.com/api",
    withCredentials: true,
    credentials: true
})
