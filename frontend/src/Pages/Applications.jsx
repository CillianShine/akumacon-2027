import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navigation from "../Components/Navigation";
import Bottom from "../Components/Bottom.jsx";
import { useContent } from "../hooks/useContent.js";
import "./Applications.css";

// Applications page component
// Displays information about applications for the event
const Applications = () => {
  const { content, loading, error } = useContent("content/applications.json");
  const applicationSections = content?.sections || [];
  const bannerImage = content?.banner_image;

  if (loading) {
    return (
      <>
        <Navigation />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div>Loading...</div>
        </div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Navigation />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div>Error loading content.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      {bannerImage && (
        <div className="applications-banner">
          <img
            src={bannerImage}
            alt="Applications Banner"
            className="applications-banner-image"
          />
        </div>
      )}
      <Container fluid className="applications-page py-5">
        <Container className="applications-content">
          <p className="applications-eyebrow">Join the Akumakon community</p>
          <h1 className="applications-title text-center mb-3">Applications</h1>
          <p className="applications-intro text-center mb-5">
            Interested in participating or contributing to our event? Check out
            these opportunities and apply today!
          </p>
          <Row xs={1} md={2} lg={3} className="g-4">
            {applicationSections.map((section, idx) => (
              <Col key={idx}>
                <Card className="application-card h-100">
                  <div className="application-card-media">
                    <Card.Img
                      variant="top"
                      src={section.image}
                      alt={section.title}
                      className="application-card-image"
                    />
                    <div className="application-card-overlay">
                      <h2 className="application-card-title text-center px-2">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Text className="application-card-description">
                      {section.description}
                    </Card.Text>
                    <div className="application-card-action mt-auto text-center">
                      <Button
                        href={section.formLink}
                        target="_blank"
                        rel="noreferrer"
                        className="application-card-button border-0"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
      <Bottom />
    </>
  );
};

export default Applications;
