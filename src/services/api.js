import axios from "axios";
const api = axios.create({
    baseURL: "https://api.oluwasetemi.dev",
    headers: {
        "Content-Type": "application/json",
    },
});
export default api;
