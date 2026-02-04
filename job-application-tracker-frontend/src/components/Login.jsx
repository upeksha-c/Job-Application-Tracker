import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../css/Login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className='login-container mx-0 px-0'>
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={8} lg={6}>
                    <h1>Login</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="loginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>

                        <p className="center-text mt-3">
                            Don't have an account? 
                            <Link to="/signup" className="ms-1">
                                Register here.
                            </Link>
                        </p>
                    </Form>                    
                </Col>
            </Row>
        </Container> 
    </div>   
  )
}
