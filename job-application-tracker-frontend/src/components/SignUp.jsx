import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { signupUser } from './loginSignupService';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState({});

    const navigation = useNavigate();

    const handleSignUp = async(e) => {
        e.preventDefault();
        const newErrors = {};

        // Basic validation
        if (!userName) {
            newErrors.userName = "User name is required";
            console.log("User name is required");
        }
        if (!email) {
            newErrors.email = "Email is required";
                console.log("Email is required");
        }
        if (!phone) {
            newErrors.phone = "Phone number is required";
            console.log("Phone number is required");
        }
        if (!password) {
            newErrors.password = "Password is required";
            console.log("Password is required");
        }

        setError(newErrors);

        // Proceed if no errors to sign up
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await signupUser(
                    {
                        user_name: userName, 
                        email: email, 
                        phone_no: phone, 
                        password: password
                    }
                );
                console.log("Sign up successful:", response);
                navigation("/");
            } catch (err) {
                setError({apiError: "Sign up failed. Please try again."});
                console.error("Sign up error:", err);
            }
        }
    }

  return (
    <div className='login-container mx-0 px-0'>
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={8} lg={6}>
                    <h1>Sign Up</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="signUpUserName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter user name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signUpEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signUpPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="tel" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signUpPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSignUp}>
                            Sign Up
                        </Button>
                        <p className="center-text mt-3">
                            Already have an account?
                            <Link to="/" className="ms-1">
                                Login here.
                            </Link>
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container>
    </div>
  )
}
