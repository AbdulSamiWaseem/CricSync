import React from 'react';
import { Link } from 'react-router-dom';
import './followingTeams.css';
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
                        <Link to="/team/fast">
                            <div className="team-item">
                                <img src="/fast-logo.png" alt="FAST Logo" />
                                <span className="team-name">FAST</span>
                            </div>
                        </Link>
                        <Link to="/team/vcc">
                            <div className="team-item">
                                <img src="/VCC-logo.png" alt="VCC Logo" />
                                <span className="team-name">V.C.C.</span>
                            </div>
                        </Link>
                        <Link to="/team/lcc">
                            <div className="team-item">
                                <img src="/LCC-logo.png" alt="LCC Logo" />
                                <span className="team-name">LCC</span>
                            </div>
                        </Link>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </DashboardHeader>
    )
}

export default FollowingTeams