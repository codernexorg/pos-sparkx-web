import axios, {AxiosRequestConfig} from 'axios';

export const baseURL = 'https://server.sparkx.com.bd/api/v1';

const api = axios.create({baseURL, withCredentials: true});

api.interceptors.request.use((data: AxiosRequestConfig) => {
    data.headers!.Authorization = 'Bearer ' + localStorage.getItem('token');
    return data;
});

export default api;
