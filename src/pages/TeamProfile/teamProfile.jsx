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
    profile_picture: '',
    total_matches: 0,
    wins: 0,
    losses: 0,
    ties: 0
  });

  const [matchHistory, setMatchHistory] = useState([]);

  useEffect(() => {
    const fetchTeamStats = async () => {
      try {
        const profileRes = await api.get(`/profile/${id}/`);
        const teamProfile = profileRes.data;

        const [progressRes, matchSetupRes] = await Promise.all([
          api.get("/progress/"),
          api.get("/matchsetups/")
        ]);

        const teamId = teamProfile.id;
        const progress = progressRes.data;
        const matchSetups = matchSetupRes.data;

        // Map match ID -> matchsetup
        const matchMap = Object.fromEntries(matchSetups.map(m => [m.id, m]));

        // Only take latest status per match (e.g. status 2 or 3)
        const latestMatches = {};
        progress.forEach(p => {
          const current = latestMatches[p.match];
          if (!current || current.status < p.status) {
            latestMatches[p.match] = p;
          }
        });

        let wins = 0, losses = 0, ties = 0;
        const matchHistory = [];

        Object.values(latestMatches).forEach(p => {
          const setup = matchMap[p.match];
          if (!setup) return;

          const isInvolved = setup.team_name === teamId || p.requested_by === teamId;
          const isFinished = p.status === 2 || p.status === 3;

          if (isInvolved && isFinished) {
            let result = 'Tied';
            if (p.winner === teamId) {
              wins++;
              result = 'Won';
            } else if (p.winner === null) {
              ties++;
            } else {
              losses++;
              result = 'Lost';
            }

            matchHistory.push({
              matchId: p.match,
              result
            });
          }
        });

        setMatchHistory(matchHistory);
        setTeamData({
          id: teamId,
          name: teamProfile.username,
          profile_picture: teamProfile.profile_picture,
          total_matches: matchHistory.length,
          wins,
          losses,
          ties
        });
      } catch (err) {
        console.error("Error loading team stats:", err);
      }
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
              <div className="team-profile_picture-wrapper">
                <img
                  className="team-profile_picture"
                  src={`${process.env.REACT_APP_BASE_URL}${teamData.profile_picture}` || "/default-profile_picture.png"}
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
