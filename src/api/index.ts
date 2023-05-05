import axios from "axios";

export const baseURL = "http://localhost:9000/api/v1";

const api = axios.create({ baseURL, withCredentials: true });

api.interceptors.request.use((data: any) => {
  data.headers!.Authorization = "Bearer " + localStorage.getItem("token");
  return data;
});

// api.interceptors.response.use(
//     response => {
//       // Do something with response data
//       return response;
//     },
//     error => {
//       // Do something with response error
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         toast.error(error.response.data.message);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//         // http.ClientRequest in node.js
//         console.log(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log('Error', error.message);
//       }
//       console.log(error.config);
//       return Promise.reject(error);
//     },
// );

export default api;
