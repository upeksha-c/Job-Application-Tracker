import axios from 'axios';

const token = localStorage.getItem('token');
const API_URL = import.meta.env.VITE_API_URL;

export async function fetchAIAnalysis() {
    try {
        const response = await axios.get(`${API_URL}/overview`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching AI analysis:', error);
        throw error;
    }
} 