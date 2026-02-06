import React from 'react'
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap'
import { useState } from 'react'
import '../css/NewApplication.css'

export default function NewApplication() {
    const [company, setCompany] = useState("")
    const [position, setPosition] = useState("")
    const [status, setStatus] = useState("")
    const [applicationDate, setApplicationDate] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [requirementsMet, setRequirementsMet] = useState("")
    const [jobLocation, setJobLocation] = useState("")
    const [notes, setNotes] = useState("")
    const [salaryRange, setSalaryRange] = useState("")
    const [contactPerson, setContactPerson] = useState("")
    const [contactEmail, setContactEmail] = useState("")
    const [contactPhone, setContactPhone] = useState("")
    const [applicationLink, setApplicationLink] = useState("")
    const [resume, setResume] = useState(null)

    // set up options for status dropdown
    const statusOptions = ["Applied", "Interviewing", "Offered", "Rejected"]
    const requirementsMetOptions = ["Yes", "No", "Partially"]
  return (
    <div>
        <Container>
                <Card className="card">
                    <Card.Header className="card-header">New Job Application</Card.Header>
                    <Card.Body className="card-body">
                        <Form>
                            <Form.Group className="mb-3" controlId="formTitleCompany">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control required
                                    type="text" 
                                    placeholder="Enter company name" 
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formTitlePosition">
                                <Form.Label>Position</Form.Label>
                                <Form.Control required
                                    type="text" 
                                    placeholder="Enter position" 
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    />
                            </Form.Group>
                            <Row className="mb-3">
                                <Col sm={12} md={6} lg={6}>
                                    <Form.Group className="mb-3" controlId="formTitleStatus">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select required
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="">Select status</option>
                                            {statusOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={6} lg={6}>
                                    <Form.Group className="mb-3" controlId="formApplicationDate">
                                        <Form.Label>Application Date</Form.Label>
                                        <Form.Control required
                                            type="date" 
                                            value={applicationDate}
                                            onChange={(e) => setApplicationDate(e.target.value)}
                                            />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="formJobDescription">
                                <Form.Label>Job Description</Form.Label>
                                <Form.Control 
                                    as="textarea"
                                    rows={5}
                                    placeholder="Enter job description"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </Form.Group>                            
                            
                            <Form.Group className="mb-3" controlId="formDetails">
                                <Form.Label>Do the job requirements met</Form.Label>
                                <Row>
                                    {requirementsMetOptions.map((option, index) => (
                                        <Col key={index} sm={12} md={2} lg={2}>
                                            <Form.Check required
                                                key={index}
                                                type="radio"
                                                label={option}
                                                name="requirementsMet"
                                                value={option}
                                                checked={requirementsMet === option}
                                                onChange={(e) => setRequirementsMet(e.target.value)}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Form.Group>
                            <Row className="mb-3">
                                <Col sm={12} md={6} lg={6}>
                                    <Form.Group className="mb-3" controlId="formJobLocation">
                                        <Form.Label>Job Location</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            placeholder="Enter job location"
                                            value={jobLocation}
                                            onChange={(e) => setJobLocation(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={6} lg={6}>
                                    <Form.Group className="mb-3" controlId="formSalaryRange">
                                        <Form.Label>Salary Range</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter salary range"
                                            value={salaryRange}
                                            onChange={(e) => setSalaryRange(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="formApplicationLink">
                                <Form.Label>Application Link</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter application link"
                                    value={applicationLink}
                                    onChange={(e) => setApplicationLink(e.target.value)}
                                />
                            </Form.Group>
                            <Row className="mb-3">
                                <Col sm={12} md={4} lg={4}>
                                    <Form.Group className="mb-3" controlId="formContactPerson">
                                        <Form.Label>Contact Person</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter contact person"
                                            value={contactPerson}
                                            onChange={(e) => setContactPerson(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={4} lg={4}>
                                    <Form.Group className="mb-3" controlId="formContactEmail">
                                        <Form.Label>Contact Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter contact email"
                                            value={contactEmail}
                                            onChange={(e) => setContactEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={4} lg={4}>
                                    <Form.Group className="mb-3" controlId="formContactPhone">
                                        <Form.Label>Contact Phone</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter contact phone"
                                            value={contactPhone}
                                            onChange={(e) => setContactPhone(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="formResume">
                                <Form.Label>Resume/CV</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setResume(e.target.files[0])}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formNotes">
                                <Form.Label>Notes</Form.Label>
                                <Form.Control
                                    as={'textarea'}
                                    rows={3}
                                    placeholder="Enter any notes about the application"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </Form.Group>
                            
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
        </Container>
    </div>
  )
}
