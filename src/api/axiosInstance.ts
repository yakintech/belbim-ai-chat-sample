import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:3001", 
})

export default axiosInstance;