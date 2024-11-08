import React from 'react';
import { FaLinkedin, FaGithub, FaTimes } from 'react-icons/fa'; // Importing icons from react-icons
import './Team.css';

import CEO from '../assets/team/CEOMalakai.png';
import COO from '../assets/team/COODelisha.png';
import CTO from '../assets/team/CTOShaqeel.png';

// Sample team member data
const teamMembers = [
  {
    id: 1,
    name: 'Malakai Johnson',
    title: 'CEO',
    description: 'Malakai is the visionary behind our company, dedicated to empowering local businesses.',
    image: CEO,
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/malakailink',
      x: 'https://twitter.com/malakai', // Assuming this is the new URL for X
      github: 'https://github.com/malakai',
    },
  },
  {
    id: 2,
    name: 'Shaqeel Less',
    title: 'CTO',
    description: 'Shaqeel leads our tech team with a focus on innovation and sustainability.',
    image: CTO,
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/shaqeellink',
      x: 'https://twitter.com/shaqeel', // Assuming this is the new URL for X
      github: 'https://github.com/shaqeel',
    },
  },
  {
    id: 3,
    name: 'Delisha-Ann Naicker',
    title: 'COO',
    description: 'Delisha drives our operational strategies, ensuring efficiency and growth.',
    image: COO,
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/delishasmith',
      x: 'https://twitter.com/delisha', // Assuming this is the new URL for X
      github: 'https://github.com/delisha',
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
                <FaLinkedin className="social-icon" />
              </a>
              <a href={member.socialLinks.x} target="_blank" rel="noopener noreferrer">
                <FaTimes className="social-icon" /> {/* Placeholder for X icon */}
              </a>
              <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="social-icon" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Team;
