import {searchApplicationService} from '../services/searchApplicationService.js';

export const searchApplications = async (req, res) => {
    try {
        const user_Id = req.user.user_id; 
        const { 
            company,
            position, 
            dateApplied, 
            status, 
            requirementsMet
        } = req.body; 

        const searchResults = await searchApplicationService({
            user_Id,
            company,
            position,
            dateApplied,
            status,
            requirementsMet
        });
        res.status(200).json(searchResults);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};