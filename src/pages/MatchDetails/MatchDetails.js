import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './matchDetails.css';
import api from '../../utils/api';

const MatchDetails = () => {
  const { id } = useParams(); // matchsetup ID
  const [match, setMatch] = useState(null);
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState(null);
  const [opponentPhone, setOpponentPhone] = useState('');

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const profileRes = await api.get("profile/");
        const currentUserId = profileRes.data.id;
        setUserId(currentUserId);
  
        const matchSetupRes = await api.get(`matchsetups/${id}/`);
        const matchSetup = matchSetupRes.data;
  
        const progressRes = await api.get("progress/");
        const matchProgress = progressRes.data.find(p => p.match === matchSetup.id && p.status === 2);
        if (!matchProgress) {
          console.warn("No accepted progress found for this match.");
          return;
        }
  
        const team1Id = matchSetup.team_name;
        const team2Id = matchProgress.requested_by;
        const opponentId = currentUserId === team1Id ? team2Id : team1Id;
  
        const opponentProfileRes = await api.get(`profile/${opponentId}/`);
        setOpponentPhone(opponentProfileRes.data.phone_number);
  
        // 🔽 Fetch all locations and find the name
        const locationsRes = await api.get("locations/");
        const locationMap = Object.fromEntries(locationsRes.data.map(loc => [loc.id, loc.name]));
        const locationName = locationMap[matchSetup.location_id] || "Unknown Location";
  
        const enrichedMatch = {
          id: matchSetup.id,
          team_1: { id: team1Id, name: profileRes.data.id === team1Id ? profileRes.data.username : opponentProfileRes.data.username },
          team_2: { id: team2Id, name: profileRes.data.id === team2Id ? profileRes.data.username : opponentProfileRes.data.username },
          date: matchSetup.date,
          location: locationName,
          status: matchProgress.status,
          progress_id: matchProgress.id,
          team1Id,
          team2Id,
        };
  
        setMatch(enrichedMatch);
        setStatus(matchProgress.status);
      } catch (error) {
        console.error('Error fetching match details:', error);
      }
    };
  
    fetchMatchDetails();
  }, [id]);
  

  const handleStatusChange = async (newStatus) => {
    if (!match) return;
    const winnerId = newStatus === 'Win' ? userId : (userId === match.team1Id ? match.team2Id : match.team1Id);
  
    try {
      await api.put(`progress/${match.progress_id}/`, {
        match: match.id,
        requested_by: match.team2Id, // or however you identify this
        winner: winnerId,
        status: 3, // assuming 3 means completed
      });
  
      setStatus("Completed");
      alert(`Match marked as ${newStatus}`);
    } catch (error) {
      console.error('Error updating match status:', error.response?.data || error);
    }
  };
  

  const handleChat = () => {
    if (!opponentPhone) return;
    const whatsappLink = `https://wa.me/${opponentPhone}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="match-detail">
      {match ? (
        <div>
          <h2 className="match-header">{match.team_1.name} vs {match.team_2.name}</h2>
          <div className="match-status">
            <p>Status: {status === 2 ? 'Upcoming' : 'Completed'}</p>
            <button className="status-btn win" onClick={() => handleStatusChange('Win')}>Mark as Win</button>
            <button className="status-btn loss" onClick={() => handleStatusChange('Loss')}>Mark as Loss</button>
          </div>

          <div className="chat-btn-section">
            <button className="chat-btn" onClick={handleChat}>Chat with Opponent</button>
          </div>

          <div className="match-details">
            <p>Match Date: {new Date(match.date).toLocaleString()}</p>
            <p>Location ID: {match.location}</p> {/* You can fetch location name if needed */}
          </div>
        </div>
      ) : (
        <p>Loading match details...</p>
      )}
    </div>
  );
};

export default MatchDetails;
