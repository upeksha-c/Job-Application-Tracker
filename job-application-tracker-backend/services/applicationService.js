import supabaseAdmin from "./supabaseAdmin.js";

export async function getApplication(applicationId, user_Id) {
    try {
        const { data, error } = await supabaseAdmin
            .from('applications')
            .select('*')
            .eq('id', applicationId)
            .eq('user_id', user_Id)
            .single();

        if (error) {
            console.error('Error fetching application details:', error);
            throw new Error('Failed to fetch application details');
        }
        //if no application empty data return
        if (!data) {
            return null;
        }
        return data;
    } catch (error) {
        console.error('Error in getApplication:', error);
        throw error;
    }   
}