# Job Application Tracker 👩‍💻

[![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react&logoColor=white)](https://reactjs.org/) 
[![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js&logoColor=white)](https://nodejs.org/) 
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

A web application to track job applications, manage statuses, and generate AI-powered analysis reports.



---

## Live Demo 🌐

- **Frontend:** [Job Application Tracker Frontend](https://job-application-tracker-frontend-uu9w.onrender.com)
  
Tryout Job Apllication Tracker.


---

## Table of Contents 📃
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## About 🧠
Job Application Tracker is a modern web application designed to help job seekers efficiently manage their applications and stay organized throughout the job search process.  

It provides a unified dashboard where users can track the status of their applications, gain insights from AI-powered analysis, and quickly access key information about each job opportunity. With a clean interface, intuitive navigation, and secure authentication, the app simplifies the process of monitoring multiple applications and making informed career decisions.

---

## Features 🎯
- The **Dashboard** has two navigation tabs:  
  - **Latest Applications** – shows your most recent applications  
  - **All Applications** – shows all applications you’ve added  

- The **Sidebar** includes:  
  - **Search Applications** – quickly find applications based on filters  
  - **Create New Application** – add new job applications  
  - **AI Analysis** – generates insights from the last 10 applications  
  - **Profile** – view and manage your account details  

- Authentication is handled using **Supabase Authentication** to secure user accounts and data.

---

## Tech Stack 🛠️

- **Frontend:** [React](https://reactjs.org/), Vite, Bootstrap, React-Bootstrap  
- **Backend:** Node.js, Express, Supabase  
- **Database & Auth:** Supabase, Supabase Auth
- **Hosting/Deployment:** [Render](https://render.com/)  
- **APIs:** Cohere (AI analysis)

---

## Installation 🔧

### Clone the repo

```bash
git clone (https://github.com/upeksha-c/Job-Application-Tracker.git)
```

### Install dependencies
```bash
cd job-application-tracker-backend
npm install
```

```bash
cd job-application-tracker-frontend
npm install
```

### Set up environment variables
Create a .env file in both backend and frontend as described below.


#### Backend
```bash
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=
JWT_SECRET=
PORT=3000
COHERE_API_KEY=
```

#### Frontend
```bash
VITE_API_URL=http://localhost:3000
```


## Contributing 👥
I welcome contributions! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Make your changes and commit: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request


## License 🪪

This project is licensed under the [MIT License](LICENSE).

