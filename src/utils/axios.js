import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_DATA_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
