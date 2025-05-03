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
import {capitalizeFirstLetter} from '../../utils/helper'

const Dashboard = () => {
  const [stats, setStats] = useState({ totalVenues: 0, totalTeams: 0, totalCities: 0 });
  const [matches, setMatches] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userRes, venuesRes, citiesRes, matchSetupsRes] = await Promise.all([
          api.get('profile/'),           // logged-in user
          api.get('locations/'),         // all venues
          api.get('cities/'),            // all cities
          api.get('matchsetups/'),       // all matches
        ]);

        const matchesWithDate = (matchSetupsRes.data || []).filter(m => m.date);
        const sortedMatches = matchesWithDate.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

        // Get unique team IDs from matches
        const teamIds = new Set(sortedMatches.map(match => match.created_by));
        
        setStats({
          totalVenues: venuesRes.data?.length || 0,
          totalCities: citiesRes.data?.length || 0,
          totalTeams: teamIds.size,
        });

        setUser(userRes.data?.username || '');
        setMatches(sortedMatches);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardHeader>
      <Sidebar>
        <div style={{ padding: "20px", width: "100%", backgroundColor: "#f0f0f0", height: "100vh" }}>
          <h1 style={{ fontWeight: "700", color: "#374957" }}>Dashboard</h1>
          <p style={{ color: "#1bcfb4" }}>Welcome back, {capitalizeFirstLetter(user)}</p>

          <div style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fill, minmax(22%, 1fr))",
            marginBottom: "20px"
          }}>
            <StatsCard title="Total Venues" count={stats.totalVenues} color1="#FE9496" color2="#FDDADB" icon={pitch} />
            <StatsCard title="Total Teams" count={stats.totalTeams} color1="#4BCBEB" color2="#D0F6FF" icon={teams} />
            <StatsCard title="Total Cities" count={stats.totalCities} color1="#1BCFB4" color2="#C3FFF6" icon={cities} />
          </div>

          <UpcomingMatchesList matchData={matches} />
        </div>
      </Sidebar>
    </DashboardHeader>
  );
};

export default Dashboard;
