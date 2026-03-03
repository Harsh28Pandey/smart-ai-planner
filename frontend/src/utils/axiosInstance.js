import axios from "axios"
// import { BASE_URL } from "./apiPaths.js"

const BASE_URL = "http://localhost:8000"

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
            if (error.response.status === 401) {
                // redirect to login page
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