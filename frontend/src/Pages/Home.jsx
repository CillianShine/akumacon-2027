import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../Components/Navigation.jsx";
import { Countdown } from "../Components/Countdown.jsx";
import { Button } from "react-bootstrap";
import { useContent } from "../hooks/useContent.js";
import { Bottom } from "../Components/Bottom.jsx";

// Home page component
// Displays the main landing page for the event
export function Home() {
  const { content, loading, error } = useContent("content/home.json");
  const navigate = useNavigate();

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
    console.error("Content loading error:", error);
  }

  // Use content from CMS or fallback to defaults
  const heroContent = content?.hero || {};
  const aboutContent = content?.about || {};

  const handleTicketClick = () => {
    const ticketPath = heroContent.ticket_link || "/ticketselection";
    navigate(ticketPath);
  };

  const handleInfoClick = () => {
    const infoPath = aboutContent.info_button_link || "/info";
    navigate(infoPath);
  };

  return (
    <>
      <Navigation />
      <div
        className="d-flex align-items-center justify-content-center text-center"
        style={{
          background: "var(--primary)",
          paddingTop: "1rem",
        }}
      >
        <div
          style={{
            backgroundImage: `url('${
              heroContent.banner_image || "/banner.jpg"
            }')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100vw",
            height: "0",
            paddingBottom: "33.33%",
            position: "relative",
          }}
        >
          <Button
            size="sm"
            className="fw-bold border-0 gla"
            style={{
              backgroundColor: "var(--primary)",
              borderRadius: "calc(0.5rem + 0.3vw)",
              fontSize: "clamp(0.9rem, 1.2vw, 1.2rem)",
              padding:
                "clamp(0.4rem, 0.6vw, 0.8rem) clamp(0.8rem, 1vw, 1.5rem)",
              position: "absolute",
              bottom: "clamp(0.5rem, 2vw, 2rem)",
              right: "clamp(1rem, 2vw, 2rem)",
              width: "30vw",
              textAlign: "center",
              minWidth: "100px",
              maxWidth: "300px",
              maxHeight: "3rem",
              minHeight: "1rem",
              ...(window.innerWidth <= 576
                ? {
                    fontSize: "0.85rem",
                    padding: "0.4rem 0.8rem",
                    width: "auto",
                  }
                : {}),
            }}
            onClick={handleTicketClick}
          >
            <span className="d-none d-sm-inline">
              {heroContent.ticket_text_desktop || "GET TICKETS"}
            </span>
            <span className="d-sm-none">
              {heroContent.ticket_text_mobile || "Tickets"}
            </span>
          </Button>
        </div>
      </div>
      {/* About Section */}
      <div
        className="container-fluid p-4"
        style={{
          background:
            "linear-gradient(var(--secondary), var(--lowlight), var(--secondary))",
        }}
      >
        <div className="row">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-1 rounded-3 bg-transparent">
            <img
              src={aboutContent.logo_image || "./Akumacon.png"}
              alt={aboutContent.logo_alt || "Event"}
              className="img-fluid rounded-3 shadow-lg"
              style={{
                maxHeight: "80vh",
                objectFit: "cover",
                backgroundColor: "var(--highlight)",
              }}
            />
          </div>
          <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <p
              style={{
                color: "var(--dark)",
                backgroundColor: "var(--highlight)",
              }}
              className="fw-bold p-3 rounded-3 shadow-lg"
            >
              {aboutContent.description || "Default description text..."}
            </p>
            <Button
              size="lg"
              className="fw-bold border-0 px-5 py-1 gla w-50"
              onClick={handleInfoClick}
            >
              {aboutContent.info_button_text || "Info"}
            </Button>
          </div>
        </div>
      </div>
      <Countdown
        startDate={content?.countdownStartDate || "February 13, 2026"}
      />
      {/* Charity Partners */}
      <div
        className="container-fluid py-4"
        style={{ background: "var(--primary)" }}
      >
        <h2 className="text-center mb-4" style={{ color: "var(--highlight)" }}>
          Our Charity Partners
        </h2>
        <div className="row justify-content-center align-items-stretch">
          {content?.charityPartners?.map((partner, idx) => (
            <div
              className="col-12 col-md-4 d-flex flex-column align-items-center mb-4 mb-md-0"
              key={idx}
            >
              <img
                src={partner.image}
                alt={partner.title}
                className="shadow-lg mb-3"
                style={{
                  width: "min(100%, 400px)",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
              <h5 className="fw-bold" style={{ color: "var(--highlight)" }}>
                {partner.title}
              </h5>
              <p className="text-center" style={{ color: "var(--highlight)" }}>
                {partner.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Location */}
      <div
        className="container my-5 p-5 rounded-3"
        style={{ background: "var(--lowlight)" }}
      >
        <div
          className="row align-items-center"
          style={{ color: "var(--highlight)" }}
        >
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="mb-3 fw-bold">Location</h2>
            <p className="fs-4 fw-bold">
              {content?.locationSection?.paragraph}
            </p>
            <Button
              variant="primary"
              href={content?.locationSection?.buttonLink || "#"}
              className="mt-2"
            >
              {content?.locationSection?.buttonText || "Learn More"}
            </Button>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <img
              src={content?.locationSection?.image}
              alt="Location"
              className="img-fluid rounded-3 shadow-lg"
              style={{ maxHeight: 300, objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      {/* Updates Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Updates</h2>
        <div className="row g-4">
          {content?.updates?.map((update, idx) => (
            <div
              className="col-12 col-md-4 d-flex align-items-stretch"
              key={idx}
            >
              <div
                className="card w-100 shadow-lg h-100"
                style={{ background: "var(--secondary)" }}
              >
                <img
                  src={update.image}
                  alt={update.title}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: 200 }}
                />
                <div
                  className="card-body d-flex flex-column"
                  style={{ color: "var(--highlight)" }}
                >
                  <h5 className="card-title">{update.title}</h5>
                  <p className="card-text">{update.caption}</p>
                  {update.buttonText && update.buttonLink && (
                    <a
                      href={update.buttonLink}
                      className="btn btn-primary mt-auto"
                    >
                      {update.buttonText}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Bottom />
    </>
  );
}

export default Home;
