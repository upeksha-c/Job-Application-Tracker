import supabaseAdmin from "./supabaseAdmin.js";

export async function saveApplication(
    {
        user_id, 
        company, 
        position, 
        status, 
        requirements_met,
        job_location,
        job_description,
        contact_person,
        salary_range,
        contact_email, 
        contact_phone, 
        application_link, 
        application_date,
        resume, 
        notes
    }) {
        let cv_path = null;
        let file_name = null;
        if (resume) {
             // Generate a unique file name using user ID and timestamp to prevent collisions
            file_name = `${user_id}/${Date.now()}_${resume.originalname}`;
        }
            
        try{
            if (resume) {
                const { data, error: uploadError } =  await supabaseAdmin.storage
                .from("cvs")
                .upload(file_name, resume.buffer, {
                    contentType: resume.mimetype,
                    upsert: false,// Prevent overwriting existing files
                });

                if (uploadError) {
                    throw uploadError;
                } 
                // Store the path to the uploaded file in the database
                cv_path = data.path;
            }

            //store data in applications table with cv_path
            console.log("application date", application_date);
            const { error:appError } = await supabaseAdmin
                .from("applications")
                .insert({
                    user_id,
                    company,
                    position,
                    status,
                    requirements_met,
                    job_location,
                    job_description,
                    contact_person,
                    salary_range: salary_range !== "" ? Number(salary_range) : null, 
                    contact_email,
                    contact_phone,
                    application_link,
                    cv_path: cv_path, // Store the path to the uploaded resume
                    application_date,
                    notes
                })

                if (appError) {
                    throw appError;
                }
                return {success: true, message: "Application saved successfully"};

        } catch (err) {
            console.error("Error saving application:", err);
            if (cv_path) {
                // Attempt to delete the uploaded file if there was an error saving the application
                await supabaseAdmin.storage.from("cvs").remove([cv_path]);
            }
            throw new Error("Failed to save application. Please try again.");
        }
    }
