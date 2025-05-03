import React, { useState, useEffect } from 'react';
import './myMatches.css';
import { CiSearch } from "react-icons/ci";
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import api from '../../utils/api';  // Import the api.js instance
import { useNavigate } from 'react-router-dom';
import MyUpcomingMatchesList from '../../components/MyUpcomingMatchesList';

const MyMatches = () => {
  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchScheduledMatches = async () => {
      try {
        // Get user info (requires JWT token)
        const profileRes = await api.get("profile/");
        const userId = profileRes.data.id;

        // Get all progress entries
        const progressRes = await api.get("progress/");
        const progress = progressRes.data;

        // Filter for accepted and not-yet-completed matches requested by this user
        const relevantProgress = progress.filter(p =>
          p.status === 1 &&
          p.winner === null &&
          p.requested_by === userId
        );

        const matchIds = relevantProgress.map(p => p.match);

        // Get all match setups
        const matchesRes = await api.get("matchsetups/");
        const allMatchSetups = matchesRes.data;

        // Get only those matches that are in matchIds
        const upcomingMatches = allMatchSetups.filter(m => matchIds.includes(m.id));

        setMatches(upcomingMatches);
        setFilteredMatches(upcomingMatches);
      } catch (error) {
        console.error("Error fetching scheduled matches:", error);
      }
    };

    fetchScheduledMatches();
  }, []);

  const handleSearch = () => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = matches.filter(match =>
      match.team_1.name.toLowerCase().includes(lowerSearch) ||
      match.team_2.name.toLowerCase().includes(lowerSearch)
    );
    setFilteredMatches(filtered);
  };

  const handleMatchClick = (matchId) => {
    navigate(`/match-detail/${matchId}`);
  };

  return (
    <DashboardHeader>
      <Sidebar>
        <div className='match-list' style={{ padding: "20px", width: "100%", backgroundColor: "#f0f0f0", height: "100vh" }}>
          <div className='my-match-search-section container'>
            <div className='search-section-a'>
              Upcoming Matches
            </div>
            <div className='search-section-b'>
              <input
                placeholder='Search by team name...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}><CiSearch /></button>
            </div>
          </div>

          <MyUpcomingMatchesList
            matches={filteredMatches}
            onMatchClick={handleMatchClick}
          />
        </div>
      </Sidebar>
    </DashboardHeader>
  );
};

export default MyMatches;
