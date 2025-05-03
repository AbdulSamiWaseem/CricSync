import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './teamsList.css';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import api from '../../utils/api';

const TeamsList = () => {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await api.get('/profile/');
        const profiles = response.data;

        // Filter out admin/superuser profiles if needed
        const teamsData = profiles.map((profile) => ({
          id: profile.id,
          name: profile.username,
          logo_url: profile.profile_picture || '/default-logo.png',
        }));

        setTeams(teamsData);
        setFilteredTeams(teamsData);
      } catch (error) {
        console.error('Error fetching team profiles:', error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const filtered = teams.filter((team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchTerm, teams]);

  const handleTeamClick = (id) => {
    navigate(`/team/${id}`);
  };

  return (
    <DashboardHeader>
      <Sidebar>
        <div className="teams-list">
          <h1>Teams List</h1>

          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="team-search-bar"
          />

          <div className="teams-container">
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team) => (
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
