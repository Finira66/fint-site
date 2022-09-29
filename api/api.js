import axios from 'axios'

export const api = axios.create({
    // baseURL: 'https://api.crypto-verse.info/api/'
});

export const calculateTradeData = () => api.get('./graph.json')

export const detectedCountry = () => api.get(`${useRuntimeConfig().public.apiUrl}/country/detect`).then((response) => response.data.data);

export const registerUser = (data) => api.post(`${useRuntimeConfig().public.apiUrl}/auth/register`, data).then(response => response.data)

