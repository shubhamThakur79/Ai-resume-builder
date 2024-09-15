import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
    baseURL: "http://localhost:1337/api",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

// Function to create a new resume
const createNewResume = async (data) => {
    try {
        const response = await axiosClient.post("/user-resumes", data);
        return response.data;  // Return the response data if needed
    } catch (error) {
        console.error("Error creating new resume:", error);
        throw error;  // Rethrow the error after logging it
    }
};

// Function to get a resume by user email
const GetUserResume = async (userEmail) => {
    try {
        const response = await axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${encodeURIComponent(userEmail)}`);
        return response.data;  // Return the response data if needed
    } catch (error) {
        console.error("Error fetching user resume:", error);
        throw error;  // Rethrow the error after logging it
    }
};

// Function to update resume details by ID
const UpdateResumeDetail = async (id, data) => {
    try {
        const response = await axiosClient.put(`/user-resumes/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating resume:", error.response ? error.response.data : error.message);
        throw error;
    }
};
const GetResumeById = (id) => axiosClient.get('/user-resumes/' + id + "?populate=*")
const DeleteResumeById = (id) => axiosClient.delete('/user-resumes/' + id)



// Export all functions
export default { createNewResume, GetUserResume, UpdateResumeDetail, GetResumeById, DeleteResumeById };
