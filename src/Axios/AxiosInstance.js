
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3000/",
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        
       if (token) {
            config.headers.token = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)