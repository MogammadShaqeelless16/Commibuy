import React from 'react';
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
    image: CEO, // Correct image import
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/malakailink',
      twitter: 'https://twitter.com/malakai',
    },
  },
  {
    id: 2,
    name: 'Shaqeel Less',
    title: 'CTO',
    description: 'Shaqeel leads our tech team with a focus on innovation and sustainability.',
    image: CTO, // Correct image import
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/shaqeellink',
      twitter: 'https://twitter.com/shaqeel',
    },
  },
  {
    id: 3,
    name: 'Delisha Smith',
    title: 'COO',
    description: 'Delisha drives our operational strategies, ensuring efficiency and growth.',
    image: COO, // Correct image import
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/delishasmith',
      twitter: 'https://twitter.com/delisha',
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
