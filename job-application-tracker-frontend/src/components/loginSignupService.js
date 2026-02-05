import axios from 'axios';

export async function signupUser({user_name, email, phone_no, password}) {
    // Use environment variable for API URL
    const API_URL = import.meta.env.VITE_API_URL;

    // Make POST request to signup endpoint
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, 
            {
                user_name, email, phone_no, password
            });
        return response.data;
    } catch (error) {
        throw error;
        console.error('Signup error:', error);
    }
}

export async function loginUser({email, password}) {

    const API_URL = import.meta.env.VITE_API_URL;

    // Make POST request to login endpoint
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email: email,
            password: password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}