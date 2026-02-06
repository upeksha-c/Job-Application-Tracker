import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import saveApplicationRoute from './routes/saveApplicationRoute.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());



//Rote to signup and login
app.use('/auth', authRoutes);

// save application route
app.use('/application', saveApplicationRoute);

// Sample route to test the server
app.get('/', (req, res) => {
  res.send('Welcome to the Job Application Tracker API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});