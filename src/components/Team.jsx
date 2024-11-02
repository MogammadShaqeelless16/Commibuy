// components/Team.js
import React from 'react';
import './Team.css';

// Sample team member data
const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    title: 'CEO',
    description: 'John is the visionary behind our company, dedicated to empowering local businesses.',
    image: '/path-to-john-image.jpg', // Replace with actual image path
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
    },
  },
  {
    id: 2,
    name: 'Jane Smith',
    title: 'CTO',
    description: 'Jane leads our tech team with a focus on innovation and sustainability.',
    image: '/path-to-jane-image.jpg', // Replace with actual image path
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/janesmith',
      twitter: 'https://twitter.com/janesmith',
    },
  },
  {
    id: 3,
    name: 'Alice Johnson',
    title: 'CMO',
    description: 'Alice drives our marketing strategies, connecting us with the community.',
    image: '/path-to-alice-image.jpg', // Replace with actual image path
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/alicejohnson',
      twitter: 'https://twitter.com/alicejohnson',
    },
  },
];

function Team() {
  return (
    <section className="team">
      <h2>Meet Our Team</h2>
      <div className="team-members">
        {teamMembers.map((member) => (
          <div className="team-member" key={member.id}>
            <img src={member.image} alt={member.name} className="member-image" />
            <h3>{member.name}</h3>
            <h4>{member.title}</h4>
            <p>{member.description}</p>
            <div className="social-links">
              <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <img src="/path-to-linkedin-icon.svg" alt="LinkedIn" className="social-icon" />
              </a>
              <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <img src="/path-to-twitter-icon.svg" alt="Twitter" className="social-icon" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Team;
