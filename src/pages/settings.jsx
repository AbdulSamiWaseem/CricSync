import React from 'react'
import './settings.css'
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Sidebar from '../components/Sidebar/Siderbar';
import StatBox from '../components/StatBox';
const Settings= () => {
    return (
        <DashboardHeader>
            <Sidebar>

                <div className='settings' style={{ padding: "20px", width: "100%",backgroundColor:"#f0f0f0",height:"100vh"}}>
                    
                    <div className='settings-section'>
                       <img className="profile-pic" src="\farhan.png" alt="Profile Picture" />
                       <div className='profile-name'>
                        <p>Farhan</p>
                       </div>
                       <div className='profile-id-container'>
                       <p className='profile-id'> Profile ID: farhan1234
                       </p>
                       </div>

                       <div className="stat-boxes" style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "40px" }}>
                       <StatBox
                        title="Batting"
                        stats={["Runs", "Average", "High Score"]}
                        bgColor="#EB9F9F"
                        titleColor="#964D4D"
                        />
                        <StatBox
                        title="Bowling"
                        stats={["Wickets", "Average", "Best Score"]}
                        bgColor="#85D8A6"
                        titleColor="#599973"
                        />
                        <StatBox
                        title="Fielding"
                        stats={["Catches", "Stumpings", "Runouts"]}
                        bgColor="#93DFF2"
                        titleColor="#2D798C"
                        />
                    </div>

                       <div className='delete-btn-container'>
                        <button className='delete-btn'>Delete Team</button>
                       </div>
                       
                    </div>
                    
                </div>
            </Sidebar>
        </DashboardHeader>
    )
}

export default Settings
