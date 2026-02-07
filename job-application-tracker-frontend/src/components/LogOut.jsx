import React from 'react'
import { Button } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function LogOut() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
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
