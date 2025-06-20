import axios from "axios"; // Importing Axios for making HTTP requests

// Creating an Axios instance with the base URL set to your backend API
const api = axios.create({
    baseURL: "https://personal-website-api-yvaf.onrender.com/api/", // Connect to Render backend
});

// Exporting the Axios instance to be used in other files
export default api;