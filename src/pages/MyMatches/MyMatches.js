import React, { useState, useEffect } from 'react';
import './myMatches.css';
import { CiSearch } from "react-icons/ci";
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import MyUpcomingMatchesList from '../../components/MyUpcomingMatchesList';
import Loader from '../../components/Loader'; // Assuming you have a loader component

const MyMatches = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Get logged-in user's profile
        const profileRes = await api.get("profile/");
        const userId = profileRes.data.id;

        // 2. Fetch progress, match setups, formats, and locations
        const [progressRes, matchSetupRes, formatsRes, locationsRes] = await Promise.all([
          api.get("progress/"),
          api.get("matchsetups/"),
          api.get("formats/"),
          api.get("locations/"),
        ]);

        const progressData = progressRes.data;
        const matchSetups = matchSetupRes.data;
        const formats = formatsRes.data;
        const locations = locationsRes.data;

        // 3. Filter accepted matches relevant to the logged-in user
        const acceptedProgress = progressData.filter(p =>
          p.status === 2 &&
          (p.requested_by === userId || matchSetups.find(m => m.id === p.match && m.team_name === userId))
        );

        // 4. Collect all unique user IDs (team_name and requested_by)
        const userIds = new Set();
        acceptedProgress.forEach(p => {
          userIds.add(p.requested_by);
          const matchedSetup = matchSetups.find(m => m.id === p.match);
          if (matchedSetup) userIds.add(matchedSetup.team_name);
        });

        // 5. Fetch profiles one by one using /profile/<id>/ 
        const profileResponses = await Promise.all(
          Array.from(userIds).map(id => api.get(`profile/${id}/`).then(res => res.data))
        );

        const profileMap = {};
        profileResponses.forEach(profile => {
          profileMap[profile.id] = profile.username;
        });

        // 6. Format and location maps
        const formatMap = Object.fromEntries(formats.map(f => [f.id, f.name]));
        const locationMap = Object.fromEntries(locations.map(l => [l.id, l.name]));

        // 7. Enrich match data
        const enrichedMatches = acceptedProgress.map(entry => {
          const matchDetails = matchSetups.find(m => m.id === entry.match);
          if (!matchDetails) return null;

          const team1Id = matchDetails.team_name;
          const team2Id = entry.requested_by;

          return {
            id: matchDetails.id,
            team_1: { id: team1Id, name: profileMap[team1Id] || 'Unknown' },
            team_2: { id: team2Id, name: profileMap[team2Id] || 'Unknown' },
            date: matchDetails.date,
            format: { id: matchDetails.format_id, name: formatMap[matchDetails.format_id] || 'Unknown' },
            location: { id: matchDetails.location_id, name: locationMap[matchDetails.location_id] || 'Unknown' },
          };
        }).filter(Boolean); // Remove nulls

        setMatches(enrichedMatches);
        setFilteredMatches(enrichedMatches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  // Search handler to filter matches by team names
  const handleSearch = () => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = matches.filter(match =>
      match.team_1.name.toLowerCase().includes(lowerSearch) ||
      match.team_2.name.toLowerCase().includes(lowerSearch)
    );
    setFilteredMatches(filtered);
  };

  // Handle match click to navigate to match detail page
  const handleMatchClick = (matchId) => {
    navigate(`/match-detail/${matchId}`);
  };

  return (
    <DashboardHeader>
      <Sidebar>
        <div className='match-list' style={{ padding: "20px", width: "100%", backgroundColor: "#f0f0f0", height: "100vh" }}>
          <div className='my-match-search-section container'>
            <div className='search-section-a'>Upcoming Matches</div>
            <div className='search-section-b'>
              <input
                placeholder='Search by team name...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}><CiSearch /></button>
            </div>
          </div>

          {/* Show loader while fetching data */}
          {loading ? (
            <Loader /> // Display loader component while fetching data
          ) : (
            <MyUpcomingMatchesList
              matches={filteredMatches}
              onMatchClick={handleMatchClick}
            />
          )}
        </div>
      </Sidebar>
    </DashboardHeader>
  );
};

export default MyMatches;
