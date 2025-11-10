import axios from "axios";

// Create an axios instance with custom configuration
const axiosInstance = axios.create({
  //baseURL (local): "http://localhost:3001/api",
  baseURL: import.meta.env.VITE_API_URL,
  // Allow cross-site requests
  withCredentials: true,
  // Set a default timeout (e.g., 30 seconds)
  timeout: 30000,
  // Set headers for the request
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
