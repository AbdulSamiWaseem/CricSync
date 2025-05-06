import React from 'react';
import './UpcomingMatchesList.css';

const UpcomingMatchesList = ({ matchData }) => {
  if (!matchData || matchData.length === 0) {
    return <p>No upcoming matches available.</p>;
  }

  return (
    <div className="matches-list">
      {matchData.map((match) => (
        <div key={match.id} className="match-item">
          <div className="match-title">
            {match.team_1?.name || 'Team A'} vs {match.team_2?.name || 'Team B'}
          </div>
          <div className="match-details">
            <div className="match-date">{match.date ? new Date(match.date).toLocaleString() : 'Date N/A'}</div>
            <div className="match-venue">{match.venue || 'Venue N/A'}</div>
            <div className="match-format">{match.format || 'Format N/A'}</div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default UpcomingMatchesList;
