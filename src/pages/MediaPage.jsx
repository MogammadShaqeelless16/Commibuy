import React from 'react';
import './MediaPage.css';

function MediaPage() {
  const mediaLinks = [
    {
      id: 1,
      title: 'Local team’s digital supply chain solution scoops top prize',
      description: 'Read about how local teams are innovating digital supply chains.',
      url: 'https://www.itweb.co.za/article/local-teams-digital-supply-chain-solution-scoops-top-prize/RgeVDvPYLEo7KJN3',
    },
    {
      id: 2,
      title: 'Team Basket wins R25 000 in Silicon Cape Hackathon',
      description: 'Find out more about Team Basket’s achievement in the Silicon Cape Hackathon.',
      url: 'https://ventureburn.com/2021/07/team-basket-wins-r25-000-in-silicon-cape-hackathon/',
    },
    {
      id: 3,
      title: 'Tech startups shine at annual innovation event',
      description: 'Discover how tech startups are making waves at annual events.',
      url: 'https://www.bizcommunity.com/Article/196/708/217463.html',
    },
  ];

  return (
    <div className="media-page">
      <h2>Media Coverage</h2>
      <div className="media-blocks">
        {mediaLinks.map((link) => (
          <div className="media-block" key={link.id}>
            <h3>{link.title}</h3>
            <p>{link.description}</p>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="media-link">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaPage;
