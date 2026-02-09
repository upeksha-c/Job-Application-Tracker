import dotenv from 'dotenv';
import { CohereClientV2 } from 'cohere-ai';

dotenv.config();


const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY })

export default cohere;