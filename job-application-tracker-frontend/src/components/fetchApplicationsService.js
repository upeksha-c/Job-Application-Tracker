import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchLatestApplications() {    
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/latest-applications`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching applications:", error);
        throw new Error("Failed to fetch applications. Please try again.");
    }
}

export async function fetchAllApplications() {

    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/all-applications`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching applications:", error);
        throw new Error("Failed to fetch applications. Please try again.");
    }
}

export async function searchApplicationsService(filters) {
    
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/search-applications`, filters, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error searching applications:", error);
        throw new Error("Failed to search applications. Please try again.");
    }
}

export async function fetchApplicationDetails(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/applications/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching application details:", error);
        throw new Error("Failed to fetch application details. Please try again.");
    }
}

export async function fetchApplicationCV(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/applications/${id}/cv`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.url;
    } catch (error) {
        console.error("Error fetching application CV:", error);
        throw new Error("Failed to fetch application CV. Please try again.");
    }
}