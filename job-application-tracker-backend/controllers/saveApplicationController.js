import { saveApplication } from "../services/saveApplicationService.js";

export async function saveApplicationController(req, res) {
    try {
        const {
            company, 
            position, 
            status, 
            requirements_met,
            job_location,
            job_description,
            contact_person,
            salary_range,
            contact_email, 
            contact_phone, 
            application_link, 
            application_date,
            notes
        } = req.body;
        const resume = req.file; // Get the uploaded file from the request
        const user_id = req.user.user_id; // Get user ID from the authenticated request

        const result = await saveApplication({
            user_id, 
            company,
            position,
            status,
            requirements_met,
            job_location,
            job_description,
            contact_person,
            salary_range,
            contact_email,
            contact_phone,
            application_link,
            application_date: new Date(application_date).toISOString(), // Convert to Date object
            resume,
            notes
        });
        res.status(201).json(result);
    } catch (err) {
        console.error("Error saving application:", err);
        res.status(500).json({ error: "An error occurred while saving the application." });
    }
}