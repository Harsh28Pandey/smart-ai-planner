import axios from "axios"
import { API_BASE_URL } from "../config/api.js"

const BASE_URL = API_BASE_URL

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

// request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token")
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        // handle common errors globally
        if (error.response) {
            if (
                error.response.status === 401 &&
                !error.config?.skipAuthRedirect
            ) {
                window.location.href = "/"
            } else if (error.response.status) {
                console.log("Server Error. Please Try Again Later.")
            }
        } else if (error.code === "ECONNABORTED") {
            console.log("Request Timeout. Please Try Again.")
        }
        return Promise.reject(error)
    }
)

export default axiosInstance