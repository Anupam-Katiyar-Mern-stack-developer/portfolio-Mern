import axios from "axios";

console.log("API URL =>", import.meta.env.VITE_API_URL);

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request URL =>", `${config.baseURL}${config.url}`);
    console.log("Token =>", token);

    return config;
});

export default API;