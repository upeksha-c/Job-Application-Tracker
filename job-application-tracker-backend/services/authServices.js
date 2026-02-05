import supabaseClient from './supabaseClient.js';
import supabaseAdmin from './supabaseAdmin.js';
import jwt from 'jsonwebtoken';

// Service function to handle user signup
export async function signUpUserService({ user_name, email, phone_no, password }) {
    try {
        const {data, error} = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,   // Automatically confirm email for simplicity
        });
        if (error) {
            return { error };
        }
        // Insert additional user details into the 'users' table
        const { error: insertError } = await supabaseAdmin.from('users').insert([
            {
                id: data.user.id,
                user_name,
                email,
                phone_no,
            },
        ]);
        if (insertError) {
            return { error: insertError };
        }
        return { data };
    } catch (error) {
        return { error };
    }
}

// Service function to handle user login
export async function loginUserService({email, password}) {
    try{
        const {data, error} = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            return { error };
        }
        // Generate JWT token
        const payload = {
            user_id : data.user.id,
            email : data.user.email,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, 
            { 
                expiresIn: '1h' 
            });
            console.log(data.user.id);
        const {data: userData, error: userError} = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('id', data.user.id)
        if(userError){
            return {error: userError};
        }
        return{ token, user: userData };
    } catch (error) {
        return { error };
    }
};

