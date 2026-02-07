import {getApplicationCVService } from '../services/applicationFileService.js';

export async function getApplicationCV(req, res) {
    const applicationId = req.params.id;
    const user_Id = req.user.user_id; 
    try {
        const fileData = await getApplicationCVService(applicationId, user_Id);
        if(!fileData) {
            return res.status(404).json({ message: 'CV not found for this application.' });
        }
        res.json({
            url: fileData.signedUrl,
        });
    } catch (error) {
        console.error("Error fetching CV:", error);
        res.status(500).json({ message: 'Failed to fetch CV. Please try again.' });
    }   
}