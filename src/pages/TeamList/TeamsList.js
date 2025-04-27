import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './teamsList.css';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';

const TeamsList = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔧 Use mock data for testing without backend
    const mockTeams = [
      {
        id: 1,
        name: 'Lahore Lions',
        logo_url: '/static/images/lahore-lions.png',
      },
      {
        id: 2,
        name: 'Karachi Kings',
        logo_url: '/static/images/karachi-kings.png',
      },
      {
        id: 3,
        name: 'Islamabad Eagles',
        logo_url: '/static/images/islamabad-eagles.png',
      },
      ,
      {
        id: 3,
        name: 'Islamabad Eagles',
        logo_url: '/static/images/islamabad-eagles.png',
      },,
      {
        id: 3,
        name: 'Islamabad Eagles',
        logo_url: '/static/images/islamabad-eagles.png',
      },,
      {
        id: 3,
        name: 'Islamabad Eagles',
        logo_url: '/static/images/islamabad-eagles.png',
      },,
      {
        id: 3,
        name: 'Islamabad Eagles',
        logo_url: '/static/images/islamabad-eagles.png',
      },
    ];
    setTeams(mockTeams);

    // 🧠 Commented out actual API logic (restore when backend is ready)
    /*
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/teams/');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeams();
    */
  }, []);

  const handleTeamClick = (id) => {
    navigate(`/team-profile/${id}`);
  };

  return (
    <DashboardHeader>
      <Sidebar>
        <div className="teams-list">
          <h1>Teams List</h1>
          <div className="teams-container">
            {teams.length > 0 ? (
              teams.map((team) => (
                <div
                  key={team.id}
                  className="team-item"
                  onClick={() => handleTeamClick(team.id)}
                >
                  <img
                    src={team.logo_url}
                    alt={`${team.name} Logo`}
                    className="team-logo"
                  />
                  <span className="team-name">{team.name}</span>
                </div>
              ))
            ) : (
              <p>No teams found.</p>
            )}
          </div>
        </div>
      </Sidebar>
    </DashboardHeader>
  );
};

export default TeamsList;
