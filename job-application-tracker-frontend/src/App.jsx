import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import HomeLayout from './layouts/HomeLayout';
import NewApplication from './components/NewApplication';
import SearchApplications from './components/SearchApplications';
import Profile from './components/Profile';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route  element={<HomeLayout />} >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addNew" element={<NewApplication />} />
          <Route path="/search" element={<SearchApplications />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
