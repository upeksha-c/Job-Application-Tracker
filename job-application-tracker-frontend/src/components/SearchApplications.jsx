import React from 'react'
import { Container, Card, Row, Col, InputGroup, Form, Dropdown, Button, DropdownItem } from 'react-bootstrap';
import { useState } from 'react';
import { searchApplicationsService } from './fetchApplicationsService';
import '../css/SearchApplications.css';


export default function SearchApplications() {
    const [searchApplicationByCompany, setSearchApplicationByCompany] = useState('');
    const [selectedDateApplied, setSelectedDateApplied] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("Select");
    const [selectedRequirementsMet, setSelectedRequirementsMet] = useState("Select");
    const [searchApplicationByPosition, setSearchApplicationByPosition] = useState("");
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState([]);  

    const statusOptions = ["Applied", "Interviewing", "Offered", "Rejected"]
    const requirementsMetOptions = ["Yes", "No", "Partially"]

    const isDisabled =
        !searchApplicationByCompany &&
        !selectedDateApplied &&
        selectedRequirementsMet === "Select" &&
        selectedStatus === "Select" &&
        searchApplicationByPosition === "Select";

    const handleSearch = async () => {
        setError(null);
        try {
            const filters = {
                company: searchApplicationByCompany,
                position: searchApplicationByPosition,
                dateApplied: selectedDateApplied,
                status: selectedStatus === "Select" ? "" : selectedStatus,
                requirementsMet: selectedRequirementsMet === "Select" ? "" : selectedRequirementsMet
            };
            
            const applications = await searchApplicationsService(filters);
            setSearchResults(applications);
            console.log("Search Results:", applications);

        } catch (error) {
            setError('Error searching applications. Please try again.');
            console.error('Error searching applications:', error);
        } finally {
            setSearchApplicationByCompany('');
            setSelectedDateApplied('');
            setSelectedStatus('Select');
            setSelectedRequirementsMet('Select');
            setSearchApplicationByPosition('');
        }
    };

  return (
    <Container className="applications-wrapper py-4">
        <Card className="search-applications-filter-card">
            <h1 className="mt-5 fw-bold text-center" style={{ color: '#4d1573' }} >Search Applications</h1>
            <Card.Body className="p-4 p-md-5">

                <Row className="g-4 justify-content-center">
                    <Col xs={12} md={6} lg={4}>
                        <InputGroup className="search-applications-input-group">
                            <InputGroup.Text className="search-applications-input-icon">
                                <i className="bi bi-building"></i>
                            </InputGroup.Text>
                                <Form.Control
                                className="search-applications-search-input"
                                type="text"
                                placeholder="Company name..."
                                value={searchApplicationByCompany}
                                onChange={(e) => setSearchApplicationByCompany(e.target.value)}
                            />
                        </InputGroup>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                        <InputGroup className="search-applications-input-group">
                            <InputGroup.Text className="search-applications-input-icon">
                                <i className="bi bi-briefcase"></i>
                            </InputGroup.Text>
                            <Form.Control
                                className="search-applications-search-input"
                                type="text"
                                placeholder="Position / Job title..."
                                value={searchApplicationByPosition}
                                onChange={(e) => setSearchApplicationByPosition(e.target.value)}
                            />
                        </InputGroup>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                        <Dropdown className="search-applications-dropdown w-100">
                            <Dropdown.Toggle
                                variant="outline-secondary"
                                className="search-applications-toggle w-100 text-start"
                                id="req-met-dropdown"
                            >
                                Requirements met: {selectedRequirementsMet}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="search-applications-dropdown-menu">
                                {requirementsMetOptions.map((req) => (
                                    <Dropdown.Item
                                        key={req}
                                        onClick={() => setSelectedRequirementsMet(req)}
                                        active={selectedRequirementsMet === req}
                                    >
                                        {req}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                        <Dropdown className="search-applications-dropdown w-100">
                            <Dropdown.Toggle
                                variant="outline-secondary"
                                className="search-applications-toggle w-100 text-start"
                                id="status-dropdown"
                            >
                                Status: {selectedStatus}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="search-applications-dropdown-menu">
                                {statusOptions.map((status) => (
                                    <Dropdown.Item
                                        key={status}
                                        onClick={() => setSelectedStatus(status)}
                                        active={selectedStatus === status}
                                    >
                                        {status}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                        <InputGroup className="search-applications-input-group">
                            <InputGroup.Text className="search-applications-input-icon">
                                <i className="bi bi-calendar-date"></i>
                            </InputGroup.Text>
                            <Form.Control
                                className="search-applications-date-input"
                                type="date"
                                value={selectedDateApplied}
                                onChange={(e) => setSelectedDateApplied(e.target.value)}
                            />
                        </InputGroup>
                    </Col>

                </Row>

        
                <div className="text-center mt-5">
                    <Button
                        className="btn-search-filter px-5 py-3"
                        disabled={isDisabled}
                        onClick={handleSearch}
                    >
                        <i className="bi bi-search me-2"></i>
                        Search Applications
                    </Button>
                </div>

            </Card.Body>
        </Card>
        
        {error ? (
            <div className="search-results-section mt-5">
                <div className="alert alert-danger mt-4">
                    {error}
                </div>
            </div>
        ) : (

            <div className="search-results-section mt-5">
                <h3 className="mb-4 p-3  text-light fw-bold">Search Results</h3>
                
                {searchResults.length === 0 ? (
                    <Card className="search-results-empty-card">
                        <Card.Body className="text-center py-5">
                            <i className="bi bi-search display-4 text-muted mb-3 d-block"></i>
                            <p className="text-muted mb-2">No applications found matching the search criteria.</p>
                        </Card.Body>
                    </Card>
                ) : (
                    <>
                    {searchResults.map((app, index) => (
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
                              ))}
                    </>
                )}
            </div>
        )}
    </Container>
  )
}
