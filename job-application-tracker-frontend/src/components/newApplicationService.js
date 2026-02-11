import axios from "axios";

export async function saveApplication({applicationData}) {
    const formData = new FormData();
    formData.append("company", applicationData.company);
    formData.append("position", applicationData.position);
    formData.append("status", applicationData.status);
    formData.append("requirements_met", applicationData.requirements_met);
    formData.append("job_location", applicationData.job_location);
    formData.append("job_description", applicationData.job_description);
    formData.append("contact_person", applicationData.contact_person);
    formData.append("salary_range", applicationData.salary_range);
    formData.append("contact_email", applicationData.contact_email);
    formData.append("contact_phone", applicationData.contact_phone);
    formData.append("application_link", applicationData.application_link);
    formData.append("notes", applicationData.notes);
    formData.append("resume", applicationData.resume); 
    formData.append("application_date", applicationData.application_date);

    const API_URL = import.meta.env.VITE_API_URL;

    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/application`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }    
}