import supabaseAdmin from "./supabaseAdmin.js";
import cohere from "./cohereClient.js";
import { PDFParse } from 'pdf-parse';

export async function generateOverview(user_id) {
    try{
        // Select latest 10 applications for the user
        const { data: applicationData, error: applicationError } = await supabaseAdmin
            .from("applications")
            .select("*")
            .eq("user_id", user_id)
            .order("application_date", { ascending: false })
            .limit(10);

        if (applicationError) {
            throw applicationError;
        }
        if (!applicationData || applicationData.length === 0) {
            return { overview: "No applications found to analyze." };
        }

        /* CHeck if attachments exists for each application. If exists
        get the document and extract the content*/
        let newApplications = [];
        for(const application of applicationData) {
            if(application.cv_path){
                const { data: fileData, error: fileError } = await supabaseAdmin
                    .storage
                    .from('cvs')
                    .createSignedUrl(application.cv_path, 900);

                if (fileError) {
                    throw fileError;
                }
                
                const response = await fetch(fileData.signedUrl); // Fetch the file using the signed URL
                const arrayBuffer = await response.arrayBuffer(); // Read the file as an ArrayBuffer

                // Extract data from the arrayBuffer 
                const parser = new PDFParse({ data: arrayBuffer });  // or { buffer: new Uint8Array(arrayBuffer) }
                const result = await parser.getText();
                // Add the extracted content to the application object
                application.cv_content = result.text;
            } else {
                application.cv_content = null;
            }
            newApplications.push(application);
        }

        // Generate overview using Cohere
        const systemPrompt = `You are a job application analyst. Analyze the provided applications and output **ONLY valid JSON** (no markdown, no backticks, no explanations, no extra text). The JSON must have exactly these keys:

            {
            "interview_rate_prediction": integer from 0 to 100,
            "strengths": array of strings,
            "weaknesses": array of strings,
            "missing_skills": array of strings,
            "recommended_roles": array of strings,
            "improvement_plan": array of strings (actionable steps)
            }

            Respond with pure JSON only.`;

        const applicationsData = newApplications.map(app => ({
            company: app.company || "N/A",
            position: app.position || "N/A",
            status: app.status || "N/A",
            cv_content: (app.cv_content || "No CV content available").slice(0, 8000), 
            application_date: app.application_date || "N/A",
            job_description: app.job_description || "",
            requirements_met: app.requirements_met ?? null,
            job_location: app.job_location || "N/A",
            notes: app.notes || "",
            salary_range: app.salary_range || "N/A",
            contact_person: app.contact_person || "N/A",
            contact_email: app.contact_email || "N/A",
            contact_phone: app.contact_phone || "N/A",
            application_link: app.application_link || "N/A"
        }));

        const userContent = `Analyze these job applications and generate the JSON report as instructed.

            Applications (array of objects):
            ${JSON.stringify(applicationsData, null, 2)}`;//null says to not change anything and 2 says to add 2 spaces for indentation to make it more readable
        
        const cohereResponse = await cohere.chat({
            model: 'command-a-03-2025',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userContent }
            ],
            max_tokens: 1000,
            temperature: 0.7,
        });
        
        const rawOverview = cohereResponse.message?.content?.[0]?.text || "";
        // Parse the generated text as JSON
        const overview = JSON.parse(rawOverview.trim());
        return overview;
    } catch (error) {
        console.error("Error generating overview:", error);
        throw error;
    }
}