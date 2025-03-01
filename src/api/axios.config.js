import axios from "axios";
const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "https://api.pelotex.com";

const API = axios.create({
  baseURL,
  withCredentials: true,
});

API.interceptors.request.use(
  function (req) {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) req.headers["Authorization"] = 'Bearer ' + token;
    return req;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default API;
