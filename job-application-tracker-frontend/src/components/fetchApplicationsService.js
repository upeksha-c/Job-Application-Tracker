import axios from 'axios';

export async function fetchLatestApplications() {
    const token = localStorage.getItem('token');
    const API_URL = import.meta.env.VITE_API_URL;
    try {
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
    const token = localStorage.getItem('token');
    const API_URL = import.meta.env.VITE_API_URL;
    try {
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