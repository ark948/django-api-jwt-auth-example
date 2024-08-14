import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// interceptor (from axios)
// intercepts all requests and adds the correct headers

// checks if access token is present in request, if not, will add it

// axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        // search LocalStorage for access token
        // if exists, add it to Authorization header in request
        // if not, do nothing
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api