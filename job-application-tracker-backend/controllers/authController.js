import {signUpUserService, loginUserService} from '../services/authServices.js';

// Controller function to handle user signup
export async function signUpUser(req, res) {
    try{
        const {user_name, email, phone_no, password} = req.body;
        if(!user_name || !email || !phone_no || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const result = await signUpUserService({user_name, email, phone_no, password});
        if(result.error){
            return res.status(400).json({message: result.error.message});
        }
        return res.status(201).json({message: "User signed up successfully"});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

// Controller function to handle user login
export async function loginUser(req, res) {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Email and password are required"});
        }
        const result = await loginUserService({email, password});
        if(result.error){
            return res.status(400).json({message: result.error.message});
        }
        return res.status(200).json(
            {
                message: "User logged in successfully", 
                token: result.token,
                user: result.user

            });
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}