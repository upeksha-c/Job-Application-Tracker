import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../css/Login.css';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='login-container mx-0 px-0'>
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={8} lg={6}>
                    <h1>Sign Up</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="signUpUserName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter user name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signUpEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signUpPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="tel" placeholder="Enter phone number" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signUpPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
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
