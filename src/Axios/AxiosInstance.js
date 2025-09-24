import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3000/",
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGFkNzQzMTM1YTM2Mzc1OTllNDIzYjkiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1tMzc3MDY2OEBnbWFpbC5jb20iLCJpYXQiOjE3NTg2NTYwMTQsImV4cCI6MTc1ODc0MjQxNH0.A333zpTZjmroo-b3NBVWnEIpETyG14yzLrDfOuY8H0A"
        // localStorage.getItem("token");
       // if (token) {
            config.headers.token = `${token}`;
       // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)