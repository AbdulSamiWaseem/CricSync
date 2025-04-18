import React from 'react';
import './teamProfile.css';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Sidebar from '../components/Sidebar/Siderbar';

const TeamProfile = () => {
  const teamName = 'FAST';
  const teamLogo = '/fast-logo.png';
  const totalMatches = 10;
  const wins = 6;
  const losses = 4;

  const matchHistory = [
    'Won Against BNU',
    'Lost Against FCCU',
    'Won Against UVAS',
    'Won Against UCP',
    'Lost Against BNU',
    'Won Against UMT',
    'Won Against BNU',
    'Won Against BNU',
  ];

  return (
    <DashboardHeader>
      <Sidebar>
        <div className="team-profile">
          <div className="team-profile-section">
            <div className="team-header">
              <div className="team-name">Team {teamName}</div>
              <div className="team-logo-wrapper">
                <img className="team-logo" src={teamLogo} alt={`${teamName} Logo`} />
              </div>
              <div className="follow-btn-wrapper">
                <button className="follow-btn">Follow +</button>
              </div>
            </div>

            <div className="team-stats">
            <div className="stat-box">
  <div className="stat-bar blue-bar">
    <div className="stat-header">Total Matches</div>
  </div>
  <div className="stat-value blue-body">{totalMatches}</div>
</div>

<div className="stat-box">
  <div className="stat-bar green-bar">
    <div className="stat-header">Won</div>
  </div>
  <div className="stat-value green-body">{wins}</div>
</div>

<div className="stat-box">
  <div className="stat-bar red-bar">
    <div className="stat-header">Lost</div>
  </div>
  <div className="stat-value red-body">{losses}</div>
</div>

            </div>

            <div className="history-section">
              <div className="history-header">History</div>
              {matchHistory.map((item, index) => (
                <div key={index} className="history-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sidebar>
    </DashboardHeader>
  );
};

export default TeamProfile;
