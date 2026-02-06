import {profileInfoService} from '../services/profileInfoService.js';

export async function getProfileInfo(req, res) {
    try {
        const user_Id = req.user.user_id; 
        const profileInfo = await profileInfoService(user_Id);
        res.json(profileInfo);
    } catch (error) {
        console.error("Error fetching profile info:", error);
        res.status(500).json({ message: "Failed to fetch profile information. Please try again." });
    }
}