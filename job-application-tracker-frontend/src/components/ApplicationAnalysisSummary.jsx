import React from 'react'
import { fetchAIAnalysis } from './fetchAIAnalysis.js';
import { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Card, ListGroup, Badge } from 'react-bootstrap';
import '../css/Analysis.css';

export default function ApplicationAnalysisSummary() {
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getAnalysis() {
            setLoading(true);
            try{
                const data = await fetchAIAnalysis();
                setAnalysis(data);
                console.log('AI Analysis data:', data);
            } catch (error) {
                console.error('Error fetching AI analysis:', error);
                setError('Failed to fetch AI analysis. Please try again later.');
            } finally {
                setLoading(false);
            }
    }
        getAnalysis();
    }, []);

  return (
    <div className="analysis-summary">
        <div className="text-center mb-5">
            <h2 className="fw-bold mb-2">Application Analysis Summary</h2>
            <p className="text-muted">This summary has generated the last ten applications you submitted to the application tracker.</p>
        </div>
        <Container className='py-5'>
            {loading ? (
                        <div className="analysis-summary text-center py-5">
                            <Spinner animation="border" variant="light" />
                            <p className="mt-3 text-light">Generating your application analysis...</p>
                        </div>
                ) : (
                error ? (
                    <div className="analysis-summary py-5">
                        <Alert variant="danger" className="text-center mx-auto" style={{ maxWidth: '600px' }}>
                            {error}
                        </Alert>
                    </div>
                ) : (
                    analysis?.overview ? (
                        <div className="analysis-summary py-5 text-center text-light">
                            <h3>{analysis.overview}</h3>
                        </div>
                    ) : (
                        analysis ? (
                            <Card className="analysis-card shadow-lg border-0">
                                <Card.Body className="p-4 p-md-5">
            
                                    <div className="text-center mb-5">
                                        <h4 className="fw-bold text-primary mb-2">
                                            Interview Success Probability
                                        </h4>
                                        <Badge bg="info" className="fs-4 px-5 py-3">
                                            {analysis.interview_rate_prediction}%
                                        </Badge>
                                    </div>

                                    <section className="mb-5">
                                        <h5 className="section-title text-success mb-3">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            Your Strengths
                                        </h5>
                                        {analysis.strengths?.length > 0 ? (
                                            <ListGroup variant="flush">
                                                {analysis.strengths.map((item, idx) => (
                                                    <ListGroup.Item key={idx} className="py-3 border-0">
                                                        {item}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        ) : (
                                            <p className="text-muted fst-italic">No strengths identified.</p>
                                        )}
                                    </section>

                                    <section className="mb-5">
                                        <h5 className="section-title text-danger mb-3">
                                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                            Areas to Improve
                                        </h5>
                                        {analysis.weaknesses?.length > 0 ? (
                                            <ListGroup variant="flush">
                                                {analysis.weaknesses.map((item, idx) => (
                                                    <ListGroup.Item key={idx} className="py-3 border-0">
                                                        {item}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        ) : (
                                            <p className="text-muted fst-italic">No weaknesses detected.</p>
                                        )}
                                    </section>

                                    <section className="mb-5">
                                        <h5 className="section-title text-warning mb-3">
                                            <i className="bi bi-lightbulb-off me-2"></i>
                                            Missing Skills
                                        </h5>
                                        {analysis.missing_skills?.length > 0 ? (
                                            <div className="d-flex flex-wrap gap-2">
                                                {analysis.missing_skills.map((skill, idx) => (
                                                    <Badge key={idx} bg="warning" text="dark" className="px-3 py-2">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted fst-italic">No major skill gaps found.</p>
                                        )}
                                    </section>

                                    <section className="mb-5">
                                        <h5 className="section-title text-info mb-3">
                                            <i className="bi bi-suit-heart-fill me-2"></i>
                                            Best-Fit Roles
                                        </h5>
                                        {analysis.recommended_roles?.length > 0 ? (
                                            <div className="d-flex flex-wrap gap-2">
                                                {analysis.recommended_roles.map((role, idx) => (
                                                    <Badge key={idx} bg="info" className="px-3 py-2">
                                                        {role}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted fst-italic">No role suggestions yet.</p>
                                        )}
                                    </section>

                                    <section>
                                        <h5 className="section-title text-primary mb-3">
                                            <i className="bi bi-list-check me-2"></i>
                                            Action Plan
                                        </h5>
                                        {analysis.improvement_plan?.length > 0 ? (
                                            <ListGroup variant="flush" numbered>
                                                {analysis.improvement_plan.map((step, idx) => (
                                                    <ListGroup.Item key={idx} className="py-3 border-bottom">
                                                        {step}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        ) : (
                                            <p className="text-muted fst-italic">No improvement suggestions at this time.</p>
                                        )}
                                    </section>
                                </Card.Body>

                                <Card.Footer className="text-muted text-center py-3 bg-light">
                                    Generated on {new Date().toLocaleDateString()}
                                </Card.Footer>
                            </Card>
                        ) : null
                    )
                
                )

            )}
        </Container>            
    </div>
  )
}
