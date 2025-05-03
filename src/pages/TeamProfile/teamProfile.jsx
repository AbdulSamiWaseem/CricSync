import React, { useEffect, useState } from 'react';
import './teamProfile.css';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import { useParams } from 'react-router-dom';
import api from '../../utils/api'; 
import { capitalizeFirstLetter } from '../../utils/helper';

const TeamProfile = () => {
  const { id } = useParams();
  const [teamData, setTeamData] = useState({
    id: null,
    name: '',
    logo: '',
    total_matches: 0,
    wins: 0,
    losses: 0,
    ties: 0
  });

  const [matchHistory, setMatchHistory] = useState([]);

  useEffect(() => {
    const fetchTeamStats = async () => {
      const profileRes = await api.get(`/profile/${id}`);
      const profileData = profileRes.data;
    
      const teamId = profileData.id;
      const teamName = profileData.username;
      const profilePic = profileData.profile_picture;
    
      const progressRes = await api.get('/progress/');
      const progressMatches = progressRes.data;
    
      const completedMatches = progressMatches.filter(
        m => m.status === 2 && m.requested_by === teamId
      );
    
      const totalMatches = completedMatches.length;
      let wins = 0, losses = 0, ties = 0;
    
      const history = completedMatches.map(match => {
        let result;
        if (match.winner === teamId) {
          wins++;
          result = 'Won';
        } else if (match.winner === null) {
          ties++;
          result = 'Tied';
        } else {
          losses++;
          result = 'Lost';
        }
    
        return {
          id: match.id,
          matchId: match.match,
          result
        };
      });
    
      setMatchHistory(history);
    
      setTeamData({
        id: teamId,
        name: teamName,
        logo: profilePic,
        total_matches: totalMatches,
        wins,
        losses,
        ties
      });
    };
    

    fetchTeamStats();
  }, [id]);

  return (
    <DashboardHeader>
      <Sidebar>
        <div className="team-profile">
          <div className="team-profile-section">
            <div className="team-header">
              <div className="team-name">Team {capitalizeFirstLetter(teamData.name)}</div>
              <div className="team-logo-wrapper">
                <img
                  className="team-logo"
                  src={teamData.logo || "/default-logo.png"}
                  alt={`${teamData.name} Logo`}
                />
              </div>
            </div>

            <div className="team-stats">
              <div className="stat-box">
                <div className="stat-bar blue-bar">
                  <div className="stat-header">Total Matches</div>
                </div>
                <div className="stat-value blue-body">{teamData.total_matches}</div>
              </div>

              <div className="stat-box">
                <div className="stat-bar green-bar">
                  <div className="stat-header">Won</div>
                </div>
                <div className="stat-value green-body">{teamData.wins}</div>
              </div>

              <div className="stat-box">
                <div className="stat-bar red-bar">
                  <div className="stat-header">Lost</div>
                </div>
                <div className="stat-value red-body">{teamData.losses}</div>
              </div>

              <div className="stat-box">
                <div className="stat-bar yellow-bar">
                  <div className="stat-header">Tied</div>
                </div>
                <div className="stat-value yellow-body">{teamData.ties}</div>
              </div>
            </div>

            <div className="history-section">
              <div className="history-header">Match History</div>
              {matchHistory.length === 0 ? (
                <div className="history-item">No completed matches yet.</div>
              ) : (
                matchHistory.map((match, index) => (
                  <div key={index} className={`history-item ${match.result.toLowerCase()}`}>
                    Match #{match.matchId} — {match.result}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Sidebar>
    </DashboardHeader>
  );
};

export default TeamProfile;
