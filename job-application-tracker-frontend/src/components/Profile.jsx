import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { fetchUserInfo } from './fetchUserInfoService.js';
import '../css/Profile.css'; 

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const user = await fetchUserInfo();
        setUserData(user);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError('Failed to load profile information');
      } finally {
        setLoading(false);
      }
    };
    loadUserInfo();
  }, []);

  return (
    <div className="profile-page">
        <Container className="py-5">
            <h1 className="profile-title mb-5 text-center">Your Profile</h1>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-purple" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger text-center mx-auto" style={{ maxWidth: '600px' }}>
                    {error}
                </div>
            ) : (
                <Card className="profile-card shadow-lg mx-auto">
                    <Card.Header className="profile-header text-center">
                        Profile Information
                    </Card.Header>

                    <Card.Body className="p-4 p-md-5">
                        <div className="text-center mb-5">
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.user_name || 'User')}&background=2e0b46&color=bd9bde&size=160&rounded=true&bold=true`}
                                alt="Profile avatar"
                                className="rounded-circle shadow-lg"
                                width={160}
                                height={160}
                                style={{ border: '5px solid #bd9bde' }}
                            />
                        </div>
                        <Row className="g-4">
                            <Col xs={12}>
                                <div className="profile-field text-center">
                                    <span className="field-label">Username</span>
                                    <span className="field-value">{userData?.user_name || '—'}</span>
                                </div>
                            </Col>

                            <Col xs={12} md={6}>
                                <div className="profile-field">
                                    <span className="field-label">Email</span>
                                    <span className="field-value">{userData?.email || '—'}</span>
                                </div>
                            </Col>

                            <Col xs={12} md={6}>
                                <div className="profile-field">
                                    <span className="field-label">Phone Number</span>
                                    <span className="field-value">
                                    {userData?.phone_no || 'No phone number provided'}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )}
        </Container>
    </div>
  );
}