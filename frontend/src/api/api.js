import axios from "axios"; // Importing Axios for making HTTP requests

// Creating an Axios instance with the base URL set to your backend API
const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/", // Base URL for the Django backend API
});

// Exporting the Axios instance to be used in other files
export default api;