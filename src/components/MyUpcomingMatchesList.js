import React from 'react';
import './myUpcomingMatchesList.css'; // Optional: Style as needed

const MyUpcomingMatchesList = ({ matches, onMatchClick }) => {
  if (!matches.length) {
    return (
      <div className="no-matches">
        <p>No upcoming matches found.</p>
      </div>
    );
  }

  return (
    <div className="upcoming-matches-container">
      {matches.map((match) => (
        <div
          key={match.id}
          className="match-card"
          onClick={() => onMatchClick(match.id)}
        >
          <div className="teams">
            <span className="team">{match.team_1?.name}</span>
            <span className="vs">vs</span>
            <span className="team">{match.team_2?.name}</span>
          </div>
          <div className="match-info">
            <p><strong>Location:</strong> {match.location?.name || 'N/A'}</p>
            <p><strong>Date:</strong> {match.date || 'TBD'}</p>
            <p><strong>Format:</strong> {match.format?.name || 'N/A'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyUpcomingMatchesList;
