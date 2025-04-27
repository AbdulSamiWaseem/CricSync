import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './matchDetails.css';

const MatchDetails = () => {
    const { id } = useParams();
    const [match, setMatch] = useState(null);
    const [status, setStatus] = useState('');

    //   useEffect(() => {
    //     const fetchMatch = async () => {
    //       try {
    //         const response = await axios.get(`http://localhost:8000/api/matches/${id}/`);
    //         setMatch(response.data);
    //         setStatus(response.data.status); 
    //       } catch (error) {
    //         console.error('Error fetching match:', error);
    //       }
    //     };
    //     fetchMatch();
    //   }, [id]);

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                // const response = await axios.get(`http://localhost:8000/api/matches/${id}/`);
                // setMatch(response.data);
                // setStatus(response.data.status);

                const sampleMatch = {
                    id,
                    team_1: { name: 'FAST' },
                    team_2: { name: 'LUMS' },
                    date: '2025-04-27T14:00:00Z',
                    location: 'Gaddafi Stadium',
                    status: 'Upcoming',
                    opponent_phone: '923001234567',
                };
                setMatch(sampleMatch);
                setStatus(sampleMatch.status);
            } catch (error) {
                console.error('Error fetching match:', error);
            }
        };

        fetchMatch();
    }, [id]);
    const handleStatusChange = async (newStatus) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/matches/${id}/update-status/`, {
                status: newStatus,
            });
            setStatus(newStatus);
        } catch (error) {
            console.error('Error updating match status:', error);
        }
    };

    const handleChat = () => {
        const opponentPhoneNumber = match.opponent_phone;
        const whatsappLink = `https://wa.me/${opponentPhoneNumber}`;
        window.open(whatsappLink, '_blank');
    };

    return (
        <div className="match-detail">
            {match ? (
                <div>
                    <h2 className="match-header">{match.team_1.name} vs {match.team_2.name}</h2>
                    <div className="match-status">
                        <p>Status: {status}</p>
                        <button className="status-btn win" onClick={() => handleStatusChange('Win')}>Mark as Win</button>
                        <button className="status-btn loss" onClick={() => handleStatusChange('Loss')}>Mark as Loss</button>
                    </div>

                    <div className="chat-btn-section">
                        <button className="chat-btn" onClick={handleChat}>Chat with Opponent</button>
                    </div>

                    <div className="match-details">
                        <p>Match Date: {match.date}</p>
                        <p>Location: {match.location}</p>

                    </div>
                </div>
            ) : (
                <p>Loading match details...</p>
            )}
        </div>
    );
};

export default MatchDetails;
