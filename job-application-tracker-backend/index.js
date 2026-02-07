import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import saveApplicationRoute from './routes/saveApplicationRoute.js';
import latestApplicationRoute from './routes/latestApplicationRoute.js';
import allApplicationRoute from './routes/allApplicationRoute.js';
import searchApplicationsRoute from './routes/searchApplicationsRoute.js';
import fetchProfileInfoRoute from './routes/fetchProfileInfoRoute.js';
import fetchApplicationDetailsRoute from './routes/fetchApplicationDetailsRoute.js';

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

//fetch latest applications
app.use('/latest-applications', latestApplicationRoute);

//fetch all applications route
app.use('/all-applications', allApplicationRoute);

//search applications route
app.use('/search-applications', searchApplicationsRoute);

//get profile info route
app.use('/profile', fetchProfileInfoRoute);
// Sample route to test the server
app.get('/', (req, res) => {
  res.send('Welcome to the Job Application Tracker API!');
});
//get application details route
app.use('/applications', fetchApplicationDetailsRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});