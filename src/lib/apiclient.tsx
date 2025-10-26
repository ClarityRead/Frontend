import axios from 'axios'

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_ORIGIN,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    console.log(token);

    if (token) {
        config.headers["authorization"] = `Bearer ${token}`;
    }

    return config;
});