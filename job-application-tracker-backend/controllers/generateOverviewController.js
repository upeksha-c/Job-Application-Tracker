import {generateOverview} from "../services/generateOverview.js";

export async function generateOverviewController(req, res) {
    const user_id = req.user.user_id; 
    try {
        const overview = await generateOverview(user_id);
        res.json(overview);
    } catch (error) {
        console.error("Error generating overview:", error);
        res.status(500).json({ error: "Failed to generate overview. Please try again." });
    }
}