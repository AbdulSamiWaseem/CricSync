import React from 'react'
import './followingTeams.css'
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Sidebar from '../components/Sidebar/Siderbar';

const FollowingTeams = () => {
    return (
        <DashboardHeader>
            <Sidebar>
                <div className='following-teams'>
                    <div className='following-teams-section'>
                        <h1 className='team-heading'>Following Teams</h1>
                        <div className="teams-container">
                            <div className="team-item">
                                <img src="/fast-logo.png" alt="FAST Logo" />
                                <span className="team-name">FAST</span>
                            </div>
                            <div className="team-item">
                                <img src="/VCC-logo.png" alt="VCC Logo" />
                                <span className="team-name">V.C.C.</span>
                            </div>
                            <div className="team-item">
                                <img src="/LCC-logo.png" alt="LCC Logo" />
                                <span className="team-name">LCC</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </DashboardHeader>
    )
}

export default FollowingTeams