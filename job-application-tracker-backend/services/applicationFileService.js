import supabaseAdmin from "./supabaseAdmin.js";

export async function getApplicationCVService(applicationId, user_Id) {
    try {
        const { data, error } = await supabaseAdmin
            .from('applications')
            .select('cv_path')
            .eq('id', applicationId)
            .eq('user_id', user_Id)
            .single();

        if (error) {
            throw error;
        }

        if (!data) {
            return null;
        }
        
        const { data: fileData, error: fileError } = await supabaseAdmin
            .storage
            .from('cvs')
            .createSignedUrl(data.cv_path, 900); 

        if (fileError) {
            throw fileError;
        }
        
        return fileData;
    } catch (error) {
        console.error("Error fetching CV path from database:", error);
        throw new Error("Failed to fetch CV. Please try again.");
    }
}
