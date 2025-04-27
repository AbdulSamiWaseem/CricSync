import React, { useEffect, useState } from 'react';
import './teamProfile.css';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TeamProfile = () => {
  const { id } = useParams(); 
  // const [teamData, setTeamData] = useState(null);
  const [teamData,setTeamData] = useState({
    id: 1,
    name: "FAST",
    logo: "/fast-logo.png",
    total_matches: 12,
    wins: 7,
    losses: 3,
    ties: 2
  }) ;
  

  useEffect(() => {
    const fetchTeamProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/team-profile/${id}/`);
        setTeamData(res.data);
      } catch (error) {
        console.error('Error fetching team profile:', error);
      }
    };
    fetchTeamProfile();
  }, [id]);

  // if (!teamData) return <div style={{ padding: '30px' }}>Loading...</div>;
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
            </div>

            <div className="history-section">
              <div className="history-header">History</div>
              {/* {teamData.history.map((item, index) => (
                <div key={index} className="history-item">{item}</div>
              ))} */}
            </div>
          </div>
        </div>
      </Sidebar>
    </DashboardHeader>
  );
};

export default TeamProfile;
