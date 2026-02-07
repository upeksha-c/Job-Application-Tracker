import React from 'react'
import { fetchLatestApplications } from './fetchApplicationsService'
import { useState, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import '../css/LatestApplications.css';
import { useNavigate } from 'react-router-dom';

export default function LastestApplications() {
  const [latestApplications, setLatestApplications] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLatestApplications();
        console.log("Fetched applications:", data);
        setLatestApplications(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const navigateCardDetails = (app) => {
    navigate(`/applications/${app.id}`)
  }

  return (
    <div className="latest-applications-container">
      <Container >
        {error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : latestApplications.length > 0 ? (
          latestApplications.map((app, index) => (
            <Card key={index} className="mb-4 shadow-sm" data-status={app.status?.toLowerCase()} onClick={() => navigateCardDetails(app)}>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  {app.company}   
                  <span className="status-value">{app.status}</span>                 
                </Card.Title>
                <Card.Subtitle className="d-flex align-items-center gap-2 mb-3">
                  {app.position}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Application Date:</strong>{' '}
                  {app.application_date ? new Date(app.application_date).toLocaleDateString() : 'N/A'}<br />
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="no-applications">
            No recent applications found.
          </p>
        )}
      </Container>
    </div>
  )
}
