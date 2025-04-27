import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './followingTeams.css';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';

const FollowingTeams = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchFollowingTeams = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/following-teams/');
                setTeams(response.data);
            } catch (error) {
                console.error('Error fetching following teams:', error);
            }
        };

        fetchFollowingTeams();
    }, []);

    return (
        <DashboardHeader>
            <Sidebar>
                <div className='following-teams'>
                    <div className='following-teams-section'>
                        <h1 className='team-heading'>Following Teams</h1>
                        <div className="teams-container">
                            {teams.length > 0 ? (
                                teams.map((team) => (
                                    <div>
                                        <img src={`http://127.0.0.1:8000${team.logo_url}`} alt={`${team.name} Logo`} />
                                        <span className="team-name">{team.name}</span>
                                    </div>
                                ))
                            ) : (
                                <p>No teams found. Follow some teams!</p>
                            )}
                        </div>
                    </div>
                </div>
            </Sidebar>
        </DashboardHeader>
    );
};

export default FollowingTeams;
