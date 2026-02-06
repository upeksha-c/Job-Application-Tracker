import supabaseAdmin from "./supabaseAdmin.js";

export async function getLatestApplications(user_id) {
    try{
        const { data, error } = await supabaseAdmin
            .from("applications")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", { ascending: false })
            .limit(10);

        if (error) {
            throw error;
        }
        if (!data) {
            return [];// Return an empty array if no applications are found
        }

        return data;
    } catch (error) {
        console.error("Error fetching latest applications:", error);
        throw new Error("Failed to fetch latest applications");
    }
}