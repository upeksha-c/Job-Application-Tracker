import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from './loginSignupService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const navigation = useNavigate();

    // Handle form submission
    const handleLogin = async(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email is required";
            console.log("Email is required");
        }
        if (!password) {
            newErrors.password = "Password is required";
            console.log("Password is required");
        }

        setError(newErrors);

        //Continue only if there are no validation errors
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await loginUser({email, password});
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user))
                navigation("/dashboard");
            } catch (err) {
                setError({apiError: "Login failed. Please check your credentials and try again."});
                console.error("Login error:", err);
            }
        }
    }

  return (
    <div className='login-container mx-0 px-0'>
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={8} lg={6}>
                    <h1>Login</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="loginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {error.email && <Form.Text className="text-danger">{error.email}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {error.password && <Form.Text className="text-danger">{error.password}</Form.Text>}
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleLogin}>
                            Login
                        </Button>

                        <p className="center-text mt-3">
                            Don't have an account? 
                            <Link to="/signup" className="ms-1">
                                Register here.
                            </Link>
                        </p>
                    </Form>  
                    {error.apiError && <p className="text-danger mt-3">{error.apiError}</p>}                  
                </Col>
            </Row>
        </Container> 
    </div>   
  )
}
