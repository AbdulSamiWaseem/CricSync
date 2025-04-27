import React, { useState, useEffect } from 'react';
import UpcomingMatchesList from '../../components/UpcomingMatchesList';
import './myMatches.css';
import { CiSearch } from "react-icons/ci";
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyMatches = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMatches, setFilteredMatches] = useState([]);

  // Fetch matches from backend
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/matches/my/");
        setMatches(response.data);
        setFilteredMatches(response.data); // Initially show all
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  // Handle search input change
  const handleSearch = () => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = matches.filter(match =>
      match.team_1.name.toLowerCase().includes(lowerSearch) ||
      match.team_2.name.toLowerCase().includes(lowerSearch)
    );
    setFilteredMatches(filtered);
  };

  // Redirect to match detail
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

          <UpcomingMatchesList
            matchData={filteredMatches}
            onMatchClick={handleMatchClick}
          />
        </div>
      </Sidebar>
    </DashboardHeader>
  );
}

export default MyMatches;
