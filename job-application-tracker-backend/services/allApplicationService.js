import supabaseAdmin from "./supabaseAdmin.js";

export async function allApplicationService(user_id) {
    try{
        const { data, error } = await supabaseAdmin
            .from("applications")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", { ascending: false });
        if (error) {
            throw error;
        }
        if (!data) {
            return [];// Return an empty array if no applications are found
        }
        return data;
    } catch (error) {
        console.error("Error fetching applications:", error);
        throw error;
    }
}