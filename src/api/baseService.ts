//base GET, POST, PUT, DELETE service using fetch API

import axiosInstance from "./axiosInstance";


const baseService = {
    get: async (endpoint: string, params = {}) => {
        const response = await axiosInstance.get(endpoint, { params });
        return response.data;
    },
    post: async (endpoint: string, data = {}) => {
        const response = await axiosInstance.post(endpoint, data);
        return response.data;
    },
    put: async (endpoint: string, data = {}) => {
        const response = await axiosInstance.put(endpoint, data);
        return response.data;
    }
}


export default baseService;