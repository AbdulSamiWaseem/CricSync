import React, { useEffect, useState } from 'react';
import StatsCard from '../../components/StatsCard';
import pitch from '../../assets/pitch.png';
import teams from '../../assets/teams.png';
import cities from '../../assets/home.png';
import Sidebar from '../../components/Sidebar/Siderbar';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import MatchesList from '../../components/MatchesList';
import axios from 'axios'; // Import axios for API requests
import './dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({ totalVenues: 0, totalTeams: 0, totalCities: 0 });
    const [matches, setMatches] = useState([]);
    const [user, setUser] = useState("Farhan"); // Replace with dynamic user fetching

    useEffect(() => {
        // Fetch the dashboard statistics
        const fetchDashboardStats = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/dashboard/stats/');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            }
        };

        // Fetch the list of matches
        const fetchMatchesList = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/matches/');
                setMatches(response.data);
            } catch (error) {
                console.error('Error fetching matches list:', error);
            }
        };

        fetchDashboardStats();
        fetchMatchesList();
    }, []);

    return (
        <DashboardHeader>
            <Sidebar>
                <div style={{ padding: "20px", width: "100%", backgroundColor: "#f0f0f0", height: "100vh" }} >
                    <h1 style={{ fontWeight: "700", color: "#374957" }}>Dashboard</h1>
                    <p style={{ color: "#1bcfb4" }}>Welcome back, {user}</p>
                    <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(22%, 1fr))", marginBottom: "20px" }}>
                        <div className='statcard'>
                            <StatsCard title="Total Venues" count={stats.totalVenues} color1="#FE9496" color2="#FDDADB" icon={pitch} />
                        </div>
                        <div className='statcard'>
                            <StatsCard title="Total Teams" count={stats.totalTeams} color1="#4BCBEB" color2="#D0F6FF" icon={teams} />
                        </div>
                        <div className='statcard'>
                            <StatsCard title="Total Cities" count={stats.totalCities} color1="#1BCFB4" color2="#C3FFF6" icon={cities} />
                        </div>
                    </div>
                    <div>
                        <MatchesList matches={matches} />
                    </div>
                </div>
            </Sidebar>
        </DashboardHeader>
    );
};

export default Dashboard;
