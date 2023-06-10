import axios from "axios";

export const baseURL = "http://localhost:9000/api/v1";

const api = axios.create({ baseURL, withCredentials: true });

api.interceptors.request.use((data: any) => {
  data.headers!.Authorization = "Bearer " + localStorage.getItem("token");
  return data;
});

export default api;
