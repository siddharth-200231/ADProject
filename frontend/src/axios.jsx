import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add error handling
API.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default API;
