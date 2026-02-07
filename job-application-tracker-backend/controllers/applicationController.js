import {getApplication} from '../services/applicationService.js';

export async function getApplicationDetails(req, res) {
    const applicationId = req.params.id;
    const user_Id = req.user.user_id; 

    try{
        const application = await getApplication(applicationId, user_Id);
        if(application){
            res.json(application);
        } else {
            res.status(404).json({message: 'Application not found'});
        }
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}