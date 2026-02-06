import supabaseAdmin from "./supabaseAdmin.js";

export async function profileInfoService(user_Id) {
    try {
        const { data, error } = await supabaseAdmin
            .from('users')
            .select('user_name, email, phone_no')
            .eq('id', user_Id)
            .single();

        if (error) {
            console.error("Error fetching profile info:", error);
            throw error;
        }
        return data;
    } catch (error) {
        console.error("Error in profileInfoService:", error);
        throw new Error("An unexpected error occurred while fetching profile information. Please try again.");
    }
}