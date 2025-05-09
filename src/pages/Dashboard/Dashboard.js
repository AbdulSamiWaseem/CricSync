import React, { useEffect, useState } from 'react';
import StatsCard from '../../components/StatsCard';
import pitch from '../../assets/pitch.png';
import teams from '../../assets/teams.png';
import cities from '../../assets/home.png';
import Sidebar from '../../components/Sidebar/Siderbar';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import UpcomingMatchesList from '../../components/UpcomingMatchesList';
import api from '../../utils/api';
import './dashboard.css';
import { capitalizeFirstLetter } from '../../utils/helper';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalVenues: 0, totalTeams: 0, totalCities: 0 });
  const [matches, setMatches] = useState([]);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true); // Loading state to manage loader visibility

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [
          userRes,
          progressRes,
          matchSetupsRes,
          locationsRes,
          formatsRes,
          citiesRes,
          usersRes
        ] = await Promise.all([
          api.get('profile/'),
          api.get('progress/'),
          api.get('matchsetups/'),
          api.get('locations/'),
          api.get('formats/'),
          api.get('cities/'),
          api.get('users/'),
        ]);
  
        const userId = userRes.data.id;
        const progress = progressRes.data;
        const matchSetups = matchSetupsRes.data;
        const formats = formatsRes.data;
        const locations = locationsRes.data;
        const cities = citiesRes.data;
        const users = usersRes.data;
  
        // Filter accepted matches
        const acceptedMatches = progress.filter(p => p.status === 2);
  
        // Get unique user IDs
        const userIds = new Set();
        acceptedMatches.forEach(p => {
          userIds.add(p.requested_by);
          const matchedSetup = matchSetups.find(m => m.id === p.match);
          if (matchedSetup) userIds.add(matchedSetup.team_name);
        });
  
        // Fetch profiles
        const profileResponses = await Promise.all(
          Array.from(userIds).map(id =>
            api.get(`profile/${id}/`).then(res => res.data)
          )
        );
  
        const profileMap = {};
        profileResponses.forEach(profile => {
          profileMap[profile.id] = profile.username;
        });
  
        // Create maps for location and format
        const locationMap = Object.fromEntries(locations.map(l => [l.id, l.name]));
        const formatMap = Object.fromEntries(formats.map(f => [f.id, f.name]));
  
        const enrichedMatches = acceptedMatches.map(entry => {
          const match = matchSetups.find(m => m.id === entry.match);
          if (!match) return null;
  
          const team1Id = match.team_name;
          const team2Id = entry.requested_by;
  
          return {
            id: match.id,
            team_1: { id: team1Id, name: profileMap[team1Id] || 'Unknown' },
            team_2: { id: team2Id, name: profileMap[team2Id] || 'Unknown' },
            date: match.date,
            venue: locationMap[match.location_id] || 'Unknown',
            format: formatMap[match.format_id] || 'Unknown',
          };
        }).filter(Boolean);
  
        const sortedMatches = enrichedMatches.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
  
        // Filter users where is_staff is false
        const validTeams = users.filter(user => !user.is_staff);
  
        setStats({
          totalVenues: locations.length,
          totalCities: cities.length,
          totalTeams: validTeams.length,  // Updated to count only non-staff teams
        });
  
        setUser(userRes.data?.username || '');
        setMatches(sortedMatches);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboardData();
  }, []);
  
  

  return (
    <DashboardHeader>
      <Sidebar>
        <div style={{ padding: "20px", width: "100%", backgroundColor: "#f0f0f0", height: "100vh" }}>
          {loading ? (
            <div className="loader-container">
              <div className="loader"></div> {/* Custom loader */}
            </div>
          ) : (
            <>
              <h1 style={{ fontWeight: "700", color: "#374957" }}>Dashboard</h1>
              <p style={{ color: "#1bcfb4" }}>Welcome back, {capitalizeFirstLetter(user)}</p>

              <div style={{
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "repeat(auto-fill, minmax(22%, 1fr))",
                marginBottom: "20px"
              }} className='statscard-container'>
                <StatsCard title="Total Venues" count={stats.totalVenues} color1="#FE9496" color2="#FDDADB" icon={pitch} />
                <StatsCard title="Total Teams" count={stats.totalTeams} color1="#4BCBEB" color2="#D0F6FF" icon={teams} />
                <StatsCard title="Total Cities" count={stats.totalCities} color1="#1BCFB4" color2="#C3FFF6" icon={cities} />
              </div>
              <h4 className='no-matches'>Upcoming Matches</h4>
              <UpcomingMatchesList matchData={matches} />
            </>
          )}
        </div>
      </Sidebar>
    </DashboardHeader>
  );
};

export default Dashboard;
