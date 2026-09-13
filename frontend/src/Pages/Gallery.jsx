import React from "react";
import Navigation from "../Components/Navigation";
import { Container, Tabs, Tab } from "react-bootstrap";
import Bottom from "../Components/Bottom.jsx";
import { useContent } from "../hooks/useContent.js";
import "./Gallery.css";

// Fixed years for the gallery, in descending order
const FIXED_YEARS = ["2025", "2024", "2023", "2020", "2019", "2018"];
// Days of the week for the gallery tabs
const DAYS = ["Friday", "Saturday", "Sunday"];

// Gallery page component
// Displays a gallery of images or media related to the event
const Gallery = () => {
  const { content, loading, error } = useContent("content/gallery.json");
  if (loading) {
    return (
      <>
        <Navigation />
        {/* MOVE TO Gallery.css: loading-state height. */}
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
  const hero = content?.hero_section || {};
  const yearsFromContent = content?.gallery_years || [];
  // Create a map for quick lookup
  const yearMap = Object.fromEntries(yearsFromContent.map((y) => [y.year, y]));
  // Ensure all fixed years are present
  const allYears = FIXED_YEARS.map(
    (year) =>
      yearMap[year] || { year, days: DAYS.map((day) => ({ day, images: [] })) }
  );

  return (
    <div>
      <Navigation />
      {/* Hero Section with background image */}
      {/* MOVE TO Gallery.css: hero background, height, and positioning styles below. */}
      <section
        className="gallery-hero py-5 text-center d-flex align-items-center justify-content-center"
        /* </div>style={{
          background: hero.background_image
            ? `url('${hero.background_image}') center/cover no-repeat`
            : "var(--highlight)",
          minHeight: 300,
          position: "relative",
        }}
        */
      >
        {/* MOVE TO Gallery.css: hero panel background, corner radius, spacing, and shadow below. */}
        <div
          style={{
            background: "rgba(59,26,105,0.7)",
            borderRadius: "1rem",
            padding: "2rem 2.5rem",
            display: "inline-block",
            boxShadow: "0 2px 8px var(--shadow-color)",
          }}
        >
          {/* MOVE TO Gallery.css: title color below. */}
          <h1
            className="text-highlight text-shadow mb-3"
            style={{ color: "var(--highlight)" }}
          >
            {hero.title || "Gallery"}
          </h1>
          {/* MOVE TO Gallery.css: subtitle color below. */}
          <p className="lead" style={{ color: "var(--highlight)" }}>
            {hero.subtitle || "Browse our event highlights by year"}
          </p>
        </div>
      </section>
      {/* Gallery Tabs Section */}
      <Container className="info-page py-5">
        <h1 className="text-center mb-5">Yearly Highlights</h1>
        <Tabs
          defaultActiveKey={allYears[0]?.year}
          id="gallery-tabs"
          className="mb-5 info-tabs"
          fill
        >
          {allYears.map((yearObj) => (
            <Tab
              eventKey={yearObj.year}
              title={yearObj.year}
              key={yearObj.year}
            >
              <Tabs
                defaultActiveKey={DAYS[0]}
                id={`day-tabs-${yearObj.year}`}
                className="mb-4 info-tabs"
                fill
              >
                {DAYS.map((day) => {
                  const dayObj = (yearObj.days || []).find(
                    (d) => d.day === day
                  ) || { day, images: [] };
                  return (
                    <Tab eventKey={day} title={day} key={day}>
                      <div className="row">
                        {dayObj.images && dayObj.images.length > 0 ? (
                          dayObj.images.map((img, idx) => (
                            <div className="col-md-4 mb-4" key={idx}>
                              <div className="card shadow-sm h-100">
                                {/* MOVE TO Gallery.css: image crop and fixed height below. */}
                                <img
                                  src={img.url}
                                  className="card-img-top"
                                  alt={
                                    img.title ||
                                    `Gallery ${yearObj.year} ${day}`
                                  }
                                  style={{ objectFit: "cover", height: 220 }}
                                />
                                <div className="card-body">
                                  <h5 className="card-title">{img.title}</h5>
                                  <p className="card-text">{img.description}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-12 text-center text-muted">
                            No images for this day yet.
                          </div>
                        )}
                      </div>
                    </Tab>
                  );
                })}
              </Tabs>
            </Tab>
          ))}
        </Tabs>
      </Container>
      <Bottom />
    </div>
  );
};

export default Gallery;
