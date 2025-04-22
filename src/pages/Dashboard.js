import React from 'react'
import StatsCard from '../components/StatsCard';
import pitch from '../assets/pitch.png'
import teams from '../assets/teams.png'
import cities from '../assets/home.png'
import Sidebar from '../components/Sidebar/Siderbar';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import MatchesList from '../components/MatchesList';
import './dashboard.css'
const Dashboard = () => {
    return (
        <DashboardHeader>
            <Sidebar>
                <div style={{ padding: "20px", width: "100%", backgroundColor: "#f0f0f0", height: "100vh" }} >
                    <h1 style={{ fontWeight: "700", color: "#374957" }}>Dashboard</h1>
                    <p style={{ color: "#1bcfb4" }}>Welcome back, Farhan</p>
                    <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(22%, 1fr))", marginBottom: "20px" }}>
                        <div className='statcard'> <StatsCard title="Total Venues" count="25" color1="#FE9496" color2="#FDDADB" icon={pitch} /></div>
                        <div className='statcard'> <StatsCard title="Total Teams" count="08" color1="#4BCBEB" color2="#D0F6FF" icon={teams} /></div>
                        <div className='statcard'><StatsCard title="Total Cities" count="04" color1="#1BCFB4" color2="#C3FFF6" icon={cities} /></div>
                    </div>
                    <div>
                        <MatchesList />
                    </div>
                </div>
            </Sidebar>
        </DashboardHeader>
    )
}

export default Dashboard
