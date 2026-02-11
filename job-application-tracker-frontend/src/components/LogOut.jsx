import React from 'react'
import { Button } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.jsx';
import { useContext } from 'react';

export default function LogOut() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext); // Access setUser from UserContext
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.clear();  
        setUser(null);
        navigate('/', { replace: true });
    }
  return (
    <Button
        variant="link"
        className="text-light p-0 logout-btn"
        onClick={handleLogout}
        title="Log out"
    >
        <FaSignOutAlt size={24} />
    </Button>
  )
}
