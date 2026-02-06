import {allApplicationService} from '../services/allApplicationService.js';

export async function getAllApplicationsController(req, res) {
    try {
        const user_id = req.user.user_id;

        const applications = await allApplicationService(user_id);
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
}