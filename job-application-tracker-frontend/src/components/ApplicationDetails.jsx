import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchApplicationDetails } from './fetchApplicationsService.js';
import { Card, Container, Row, Col, Badge, ListGroup } from 'react-bootstrap';
import '../css/ApplicationDetails.css';
import { fetchApplicationCV } from './fetchApplicationsService.js';

export default function ApplicationDetails() {
    const { id } = useParams();
    const [applicationDetails, setApplicationDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const [loadingCV, setLoadingCV] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try{
                const details = await fetchApplicationDetails(id);
                setApplicationDetails(details);
                console.log("Fetched application details:", details);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching application details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();    
    }, [id]);

        if (loading) {
            return (
            <Container className="py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </Container>
            );
        }

        if (error || !applicationDetails) {
            return (
            <Container className="py-5">
                <div className="alert alert-danger text-center">
                {error || 'Application not found'}
                </div>
            </Container>
            );
        }

        const getUrl = async (id) => {
            setLoadingCV(true);
            try {
                const response = await fetchApplicationCV(id);
                if (!response) {
                    return alert('CV not found for this application.');
                }
                setUrl(response);
                window.open(response, '_blank', 'noopener,noreferrer');
            } catch (error) {
                setError('Failed to fetch CV. Please try again.');
            } finally {
                setLoadingCV(false);
            }
        }
    

  return (
    <div className="application-details-isolated-wrapper">
        <div className="application-details-page">
            <Container className="py-5">
                <h1 className="page-title mb-5 text-center">
                    Application Details
                </h1>

                <Card className="my-super-unique-detail-card-xyz shadow-lg mx-auto">
                    <Card.Header className="detail-header px-4 py-3">
                        <Row>
                            <Col xs={12} md={6} className="mb-2 mb-md-0">
                                {applicationDetails.company || 'Unknown Company'}
                            </Col>
                            <Col xs={12} md={6}>
                                <div>
                                    <Badge
                                        bg={
                                        applicationDetails.status === 'Offered' ? 'success' :
                                        applicationDetails.status === 'Interviewing' ? 'warning' :
                                        applicationDetails.status === 'Rejected' ? 'danger' :
                                        'primary'
                                        }
                                        className="status-badge fs-6 px-4 py-2"
                                    >
                                        {applicationDetails.status || 'Applied'}
                                    </Badge>
                                </div>
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body className="p-4 p-md-5">
                        <Row >                        
                            <Col xs={12} md={6}>
                                <div className="info-block">
                                <h5 className="info-title">Position</h5>
                                <p className="info-value">{applicationDetails.position || '—'}</p>
                                </div>
                            </Col>               

                            <Col xs={12} md={6}>
                                <div className="info-block">
                                <h5 className="info-title">Applied On</h5>
                                    <p className="info-value">
                                        {applicationDetails.application_date
                                        ? new Date(applicationDetails.application_date).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                            })
                                        : '—'}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6}>
                                <div className="info-block">
                                    <h5 className="info-title">Location</h5>
                                    <p className="info-value">{applicationDetails.job_location || '—'}</p>
                                </div>
                            </Col>

                            <Col xs={12} md={6}>
                                <div className="info-block">
                                    <h5 className="info-title">Salary Range</h5>
                                    <p className="info-value">{applicationDetails.salary_range || 'Not specified'}</p>
                                </div>
                            </Col>
                        </Row>                
                        

                        <Row >
                            <Col xs={12}>
                                <div className="info-block">
                                <h5 className="info-title">Requirements Met</h5>
                                <p className="info-value">
                                    {applicationDetails.requirements_met || 'Not specified'}
                                </p>
                                </div>
                            </Col>
                        </Row>
                
                        <div className='info-block pb-4'>
                            <Row>
                                <Col xs={12} >
                                    <h5 className="section-title mt-4 mb-3">Contact Information : </h5>
                                </Col>
                                <Col xs={12}  >
                                        <div className="mb-2 text-muted">
                                            <strong>Contact Person:</strong>{' '}
                                            {applicationDetails.contact_person || '-'}
                                        </div>  
                                        <div className="mb-2 text-muted">
                                            <strong>Email:</strong>{' '}
                                            {applicationDetails.contact_email || '-'}
                                        </div>
                                        <div className="mb-2 text-muted">
                                            <strong>Phone:</strong>{' '}
                                            {applicationDetails.contact_phone || '-'}
                                        </div>
                                </Col>
                            </Row>

                            <h5 className="section-title mt-4 mb-3">Links & Documents</h5>
                            <Row>
                                <Col xs={12} >
                                    <div className="d-flex flex-wrap gap-3">
                                        {applicationDetails.application_link ? (
                                            <a
                                                href={applicationDetails.application_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-primary"
                                            >
                                                <i className="bi bi-link-45deg me-2"></i>
                                                Application Link
                                            </a>
                                        ) : (
                                            <span className="text-muted">No link provided</span>
                                        )}
                                    </div>
                                </Col>
                                <Col xs={12} >
                                    <div className="d-flex flex-wrap gap-3 mt-3">
                                        {applicationDetails.cv_path ? (
                                            <button
                                                className="btn btn-outline-success"
                                                onClick={() => getUrl(applicationDetails.id)}
                                                disabled={loadingCV}
                                            >
                                                {loadingCV ? (
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                ) : (
                                                    <i className="bi bi-file-earmark-pdf me-2"></i>
                                                )}
                                                View CV
                                            </button>
                                        ) : (
                                            <span className="text-muted">No CV uploaded</span>
                                        )}
                                </div>
                                </Col>
                            </Row>
                
                            <Row>
                                <Col xs={12}>
                                    <div className="d-flex flex-wrap gap-3 mt-3">
                                        {applicationDetails.notes ? (
                                            <div >
                                            <h5 className="section-title mt-4 mb-3">Notes</h5>
                                                {applicationDetails.notes}                                
                                            </div>                                
                                        ) : (
                                            <span className="text-muted">No notes added</span>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Card.Body>

                    <Card.Footer className="text-muted text-center py-3">
                        Created: {new Date(applicationDetails.created_at).toLocaleDateString()}
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    </div>
  );
}
