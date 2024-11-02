import React from 'react';
import './Timeline.css';

const timelineEvents = [
  { year: "2021", label: "Concept", description: "Commiploy concept was born to connect communities through local job opportunities." },
  { year: "2023", label: "First Demo", description: "The first demo version was created, showcasing initial features and interface." },
  { year: "2024", label: "MVP Launch", description: "Our MVP was launched, connecting users across South Africa with essential services." }
];

function Timeline() {
  return (
    <section className="timeline">
      <h2>Our Journey</h2>
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {timelineEvents.map((event, index) => (
          <div key={index} className="timeline-point">
            <div className="label">{event.label}</div>
            <div className="point-marker">
            </div>
            <span className="year">{event.year}</span>
            <div className="event-details">
              <p className="event-description">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Timeline;
