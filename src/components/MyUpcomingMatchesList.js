import React from 'react';
import './myUpcomingMatchesList.css';

const MyUpcomingMatchesList = ({ matches = [], onMatchClick = () => {} }) => {
  if (!matches.length) {
    return (
      <div className="no-matches">
        <p>No upcoming matches found.</p>
      </div>
    );
  }

  return (
    <div className="upcoming-matches-container">
      {matches.map((match) => {
        const { id, team_1, team_2, location, date, format } = match;

        return (
          <div
            key={id}
            className="match-card"
            onClick={() => onMatchClick(id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onMatchClick(id)}
          >
            <div className="teams">
              <span className="team">{team_1?.name || 'Team 1'}</span>
              <span className="vs">vs</span>
              <span className="team">{team_2?.name || 'Team 2'}</span>
            </div>
            <div className="match-info">
              <p><strong>Location:</strong> {location?.name || 'N/A'}</p>
              <p><strong>Date:</strong> {date || 'TBD'}</p>
              <p><strong>Format:</strong> {format?.name || 'N/A'}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyUpcomingMatchesList;
