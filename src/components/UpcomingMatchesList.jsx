import React, { useEffect, useState } from 'react';
import './UpcomingMatchesList.css';
import axios from 'axios';

const UpcomingMatchesList = ({ endpoint, onMatchClick }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // const response = await axios.get(endpoint);
        // setMatches(response.data);

        const sampleData = [
          {
            id: 1,
            team_1: { name: "FAST" },
            team_2: { name: "LUMS" },
            venue: "Gaddafi Stadium",
            date: "2025-04-27T14:00:00Z",
          },
          {
            id: 2,
            team_1: { name: "NUST" },
            team_2: { name: "COMSATS" },
            venue: "Rawalpindi Stadium",
            date: "2025-04-29T10:00:00Z",
          },
          {
            id: 3,
            team_1: { name: "PU" },
            team_2: { name: "UET" },
            venue: "National Stadium Karachi",
            date: "2025-05-01T16:00:00Z",
          }
        ];
        setMatches(sampleData);

      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, [endpoint]);

  return (
    <div className="matches-list">
      {matches.map((match) => (
        <div
          key={match.id}
          className="match-item"
          onClick={() => onMatchClick(match.id)}
        >
          <div className="match-title">
            {match.team_1.name} vs {match.team_2.name}
          </div>
          <div className="match-details">
            <div className="match-date">{new Date(match.date).toLocaleDateString()}</div>
            <div className="match-venue">{match.venue}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingMatchesList;
