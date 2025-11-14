import axios from "axios";
import storageHelper from "../utils/storageHelper";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
})


axiosInstance.interceptors.request.use(async (config: any) => {
    const token = await storageHelper.getItem("token");
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;



