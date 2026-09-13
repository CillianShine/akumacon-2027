import React, { useEffect, useState } from "react";

// Countdown component to display a timer for the event
// Accepts props for the target date and updates the countdown dynamically
export function Countdown({ startDate = "February 13, 2027" }) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Change 768 to your desired breakpoint
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile); // Listen for window resize

    const calculateTimeLeft = () => {
      const eventDate = new Date(startDate);
      const difference = eventDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, [startDate]);

  return (
    <section
      className=" text-center py-5"
      style={{
        background: "linear-gradient(var(--secondary),80%, var(--primary))",
      }}
    >
      <div className="container">
        <h2 className="fs-2 fw-bold mb-4" style={{ color: "var(--highlight)" }}>
          COUNTDOWN TO AKUMAKON 2027
        </h2>
        <p className="fs-2 mb-4 fw-bold" style={{ color: "var(--highlight)" }}>
          {startDate}
        </p>
        <div className="d-flex justify-content-between mx-5 flex-wrap gap-4">
          <div>
            <span
              className="display-5 fw-bold"
              style={{ color: "var(--highlight)" }}
            >
              {countdown.days}
            </span>
            <p className="fs-3" style={{ color: "var(--highlight)" }}>
              Days
            </p>
          </div>
          <div>
            <span
              className="display-5 fw-bold"
              style={{ color: "var(--highlight)" }}
            >
              {countdown.hours}
            </span>
            <p className="fs-3" style={{ color: "var(--highlight)" }}>
              Hours
            </p>
          </div>
          {!isMobile && (
            <>
              <div>
                <span
                  className="display-5 fw-bold"
                  style={{ color: "var(--highlight)" }}
                >
                  {countdown.minutes}
                </span>
                <p className="fs-3" style={{ color: "var(--highlight)" }}>
                  Minutes
                </p>
              </div>
              <div>
                <span
                  className="display-5 fw-bold"
                  style={{ color: "var(--highlight)" }}
                >
                  {countdown.seconds}
                </span>
                <p className="fs-3" style={{ color: "var(--highlight)" }}>
                  Seconds
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Countdown;
