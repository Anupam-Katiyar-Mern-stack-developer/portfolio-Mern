import axios from "axios";

console.log("API URL =>", import.meta.env.VITE_API_URL);

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  console.log("Request URL =>", `${config.baseURL}${config.url}`);
  return config;
});

export default API;