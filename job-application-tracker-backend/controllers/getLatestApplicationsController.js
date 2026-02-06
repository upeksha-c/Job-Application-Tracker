import {getLatestApplications} from '../services/getLatestApplicationsService.js';

export async function getLatestApplicationsController(req, res) {
    try {
        const user_id = req.user.user_id;

        const applications = await getLatestApplications(user_id);
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch latest applications' });
    }
}