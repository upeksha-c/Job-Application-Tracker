import React from 'react'
import { fetchAllApplications } from './fetchApplicationsService'
import { useState, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import '../css/LatestApplications.css';

export default function AllApplications() {
  const [allApplications, setAllApplications] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchAllApplications();
          console.log("Fetched applications:", data);
          setAllApplications(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
  return (
    <div className="latest-applications-container">
      <Container >
        {allApplications.length > 0 ? (
          allApplications.map((app, index) => (
            <Card key={index} className="mb-4 shadow-sm" data-status={app.status?.toLowerCase()}>
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
