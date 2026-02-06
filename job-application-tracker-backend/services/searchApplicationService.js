import supabaseAdmin from "./supabaseAdmin.js";

export async function searchApplicationService({ user_Id, company, position, dateApplied, status, requirementsMet }) {
    try {
        let query = supabaseAdmin
            .from('applications')
            .select('*')
            .eq('user_id', user_Id);

            if (company) {
                query = query.ilike('company', `%${company}%`);
            }
            if (position) {
                query = query.ilike('position', `%${position}%`);
            }
            if (dateApplied) {
                const start = `${dateApplied}T00:00:00`;
                const end = `${dateApplied}T23:59:59.999`;

                query = query.gte('application_date', start).lte('application_date', end);
            }
            if (status) {
                query = query.eq('status', status);
            }
            if (requirementsMet) {
                query = query.eq('requirements_met', requirementsMet);
            }

        const { data, error } = await query;

        if (error) {
            throw new Error(error.message);
        }
        if (!data || data.length === 0) {
            return [];
        }

        return data;
    } catch (error) {
        console.error("Error searching applications:", error);
        throw new Error("Failed to search applications. Please try again.");
    }
}