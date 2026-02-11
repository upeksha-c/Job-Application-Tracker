import React from 'react'
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap'
import { useState } from 'react'
import '../css/NewApplication.css'
import { saveApplication } from './newApplicationService.js';
import { useNavigate } from 'react-router-dom';

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
    const [error, setError] = useState({})

    const navigate = useNavigate();

    // set up options for status dropdown
    const statusOptions = ["Applied", "Interviewing", "Offered", "Rejected"]
    const requirementsMetOptions = ["Yes", "No", "Partially"]

    // Handle form submission
    const handleSubmit = async (e) => {
        console.log("application date", applicationDate);
        e.preventDefault(); // Prevent default form submission behavior
        const newErrors = {};
        if (!company) {
            newErrors.company = "Company name is required";
            console.log("Company name is required");
        }
        if (!position) {
            newErrors.position = "Position is required";
        }
        if (!status) {
            newErrors.status = "Status is required";
        }
        if (!applicationDate) {
            newErrors.applicationDate = "Application date is required";
        }
        if(!jobLocation) {
            newErrors.jobLocation = "Job location is required";
        }
        setError(newErrors);

        //Continue only if there are no validation errors
        if (Object.keys(newErrors).length === 0) {
            const applicationData = {
                company,
                position,
                status,
                application_date: applicationDate,
                job_description: jobDescription,
                requirements_met: requirementsMet,
                job_location: jobLocation,
                salary_range: salaryRange ,
                contact_person: contactPerson,
                contact_email: contactEmail,
                contact_phone: contactPhone,
                application_link: applicationLink,
                resume,
                notes
            };

            try {
                const response = await saveApplication({applicationData}); 
                console.log("Application saved successfully:", response);
                if (response.success) {
                    props.onAdded();// refresh the application list in dashboard
                    navigate("/dashboard");
                }

            } catch (error) {
                console.error("Error saving application:", error);
                setError({apiError: "An error occurred while saving the application. Please try again."});
            } finally {
                // Reset form fields after submission
                setCompany("");
                setPosition("");
                setStatus("");
                setApplicationDate("");
                setJobDescription("");
                setRequirementsMet("");
                setJobLocation("");
                setSalaryRange("");
                setContactPerson("");
                setContactEmail("");
                setContactPhone("");
                setApplicationLink("");
                setResume(null);
                setNotes("");
            }
        }
    }
  return (
    <div>
        <Container>
                <Card className="card">
                    <Card.Header className="card-header">New Job Application</Card.Header>
                    <Card.Body className="card-body">
                        <Form>
                            <Form.Group className="mb-3" controlId="formTitleCompany">
                                <Form.Label>Company Name *</Form.Label>
                                <Form.Control required
                                    type="text" 
                                    placeholder="Enter company name" 
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    />
                                {error.company && <Form.Text className="text-danger">{error.company}</Form.Text>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formTitlePosition">
                                <Form.Label>Position *</Form.Label>
                                <Form.Control required
                                    type="text" 
                                    placeholder="Enter position" 
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    />
                                {error.position && <Form.Text className="text-danger">{error.position}</Form.Text>}
                            </Form.Group>
                            <Row className="mb-3">
                                <Col sm={12} md={6} lg={6}>
                                    <Form.Group className="mb-3" controlId="formTitleStatus">
                                        <Form.Label>Status *</Form.Label>
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
                                        {error.status && <Form.Text className="text-danger">{error.status}</Form.Text>}
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={6} lg={6}>
                                    <Form.Group className="mb-3" controlId="formApplicationDate">
                                        <Form.Label>Application Date *</Form.Label>
                                        <Form.Control required
                                            type="date" 
                                            value={applicationDate}
                                            onChange={(e) => setApplicationDate(e.target.value)}
                                            />
                                        {error.applicationDate && <Form.Text className="text-danger">{error.applicationDate}</Form.Text>}
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
                                        <Form.Label>Job Location *</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            placeholder="Enter job location"
                                            value={jobLocation}
                                            onChange={(e) => setJobLocation(e.target.value)}
                                        />
                                        {error.jobLocation && <Form.Text className="text-danger">{error.jobLocation}</Form.Text>}
                                    </Form.Group>

                                </Col>
                                <Col sm={12} md={6} lg={6}>
                                    <Form.Group className="mb-3" controlId="formSalaryRange">
                                        <Form.Label>Salary Range</Form.Label>
                                        <Form.Control
                                            type="number"
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
                            
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Save Application
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
        </Container>
    </div>
  )
}
