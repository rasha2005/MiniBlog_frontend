import axios from "axios";




export const Api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ,
    withCredentials: true
});


Api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );
  
Api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log("Error intercepted:", error);
    }
);