import axios from "axios";

const API_BASE_URL = "https://localhost:7093";

const api = axios.create({
	baseURL: API_BASE_URL,
});

// You can add interceptors for handling auth tokens, errors, etc.
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
