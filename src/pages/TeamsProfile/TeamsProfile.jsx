import React, { useEffect, useState } from 'react';
import './teamsProfile.css';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TeamsProfile = () => {
  const { id } = useParams();

  const [teamData, setTeamData] = useState({
    id: 1,
    name: "FAST",
    logo: "/fast-logo.png",
    total_matches: 12,
    wins: 7,
    losses: 3,
    ties: 2,
    history: [
      "Won vs UET - 10 overs",
      "Lost vs NUST - 5 overs",
      "Tied with COMSATS - 20 overs"
    ]
  });

  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const mockData = {
      id,
      name: "FAST",
      logo: "/fast-logo.png",
      total_matches: 12,
      wins: 7,
      losses: 3,
      ties: 2,
      history: [
        "Won vs UET - 10 overs",
        "Lost vs NUST - 5 overs",
        "Tied with COMSATS - 20 overs"
      ],
      is_followed: false,
    };
    setTeamData(mockData);
    setIsFollowed(mockData.is_followed);

    /*
    const fetchTeamProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/team-profile/${id}/`);
        setTeamData(res.data);
        setIsFollowed(res.data.is_followed);
      } catch (error) {
        console.error('Error fetching team profile:', error);
      }
    };
    fetchTeamProfile();
    */
  }, [id]);

  const handleFollowClick = async () => {
    setIsFollowed(true);
    console.log(`Mock follow team ${id}`);
    /*
    try {
      const response = await axios.post(`http://localhost:8000/api/follow-team/${id}/`);
      if (response.status === 200) {
        setIsFollowed(true);
      }
    } catch (error) {
      console.error('Error following the team:', error);
    }
    */
  };

  const handleUnfollowClick = async () => {
    setIsFollowed(false);
    console.log(`Mock unfollow team ${id}`);
    /*
    try {
      const response = await axios.post(`http://localhost:8000/api/unfollow-team/${id}/`);
      if (response.status === 200) {
        setIsFollowed(false);
      }
    } catch (error) {
      console.error('Error unfollowing the team:', error);
    }
    */
  };

  return (
    <DashboardHeader>
      <Sidebar>
        <div className="team-profile">
          <div className="team-profile-section">
            <div className="team-header">
              <div className="team-name">Team {teamData.name}</div>
              <div className="team-logo-wrapper">
                <img className="team-logo" src={teamData.logo || "/default-logo.png"} alt={`${teamData.name} Logo`} />
              </div>
              <div className="follow-btn-wrapper">
                {isFollowed ? (
                  <button className="unfollow-btn" onClick={handleUnfollowClick}>Unfollow -</button>
                ) : (
                  <button className="follow-btn" onClick={handleFollowClick}>Follow +</button>
                )}
              </div>
            </div>

            <div className="team-stats">
              <div className="stat-box">
                <div className="stat-bar blue-bar"><div className="stat-header">Total Matches</div></div>
                <div className="stat-value blue-body">{teamData.total_matches}</div>
              </div>

              <div className="stat-box">
                <div className="stat-bar green-bar"><div className="stat-header">Won</div></div>
                <div className="stat-value green-body">{teamData.wins}</div>
              </div>

              <div className="stat-box">
                <div className="stat-bar red-bar"><div className="stat-header">Lost</div></div>
                <div className="stat-value red-body">{teamData.losses}</div>
              </div>

              <div className="stat-box">
                <div className="stat-bar yellow-bar"><div className="stat-header">Tied</div></div>
                <div className="stat-value yellow-body">{teamData.ties}</div>
              </div>
            </div>

            <div className="history-section">
              <div className="history-header">History</div>
              {teamData.history.length > 0 ? (
                teamData.history.map((item, index) => (
                  <div key={index} className="history-item">{item}</div>
                ))
              ) : (
                <p>No history available for this team.</p>
              )}
            </div>
          </div>
        </div>
      </Sidebar>
    </DashboardHeader>
  );
};

export default TeamsProfile;
