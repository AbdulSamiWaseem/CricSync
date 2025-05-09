import React, { useState, useEffect } from 'react';
import './matchesHistory.css';
import { CiSearch } from "react-icons/ci";
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import api from '../../utils/api';
import Loader from '../../components/Loader';

const MatchesHistory = () => {
    const [matches, setMatches] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [entries, setEntries] = useState(10);
    const [matchResult, setMatchResult] = useState('');
    const [totalMatches, setTotalMatches] = useState(0);
    const [loading, setLoading] = useState(true);
    const [formats, setFormats] = useState([]);

    useEffect(() => {
        const fetchFormats = async () => {
            try {
                const formatsRes = await api.get('formats/');
                setFormats(formatsRes.data);
            } catch (error) {
                console.error('Error fetching formats:', error);
            }
        };
        fetchFormats();
    }, []);

    useEffect(() => {
        const fetchMatchHistory = async () => {
            try {
                setLoading(true);
                const storedProfile = localStorage.getItem("profile");
                const user = JSON.parse(storedProfile);
                const userId = user.id;
    
                const [progressRes, matchSetupsRes, citiesRes] = await Promise.all([
                    api.get('progress/', {
                        params: {
                            search,
                            filter,
                            result: matchResult,
                            page_size: entries,
                        },
                    }),
                    api.get('matchsetups/'),
                    api.get('cities/'),
                ]);
    
                const progressData = progressRes.data;
                const matchSetups = matchSetupsRes.data;
                const cities = citiesRes.data;
    
                const cityMap = Object.fromEntries(cities.map(c => [c.id, c.name]));
                const formatMap = Object.fromEntries(formats.map(f => [f.id, f.name]));
                console.log(progressData
                    .filter(match => {
                        const setup = matchSetups.find(s => s.id === match.match);
                        if (!setup) return false;
    
                        // Only include matches where the status is 3 (Completed) and the user is involved
                        return match.status === 3 && match.winner !== null &&
                            (match.requested_by === userId || setup.team_name === userId);
                    }).map(match => {
                        const setup = matchSetups.find(s => s.id === match.match);
                        if (!setup) return null;

                        let isWinner = false
                        console.log(match)

                        if(match.Winner){
                            isWinner = match.winner === userId;
                        }                        
    
                        const opponentId =
                            match.requested_by === userId ? setup.team_name : match.requested_by;
    
                        return {
                            id: match.id,
                            format: formatMap[setup.format_id] || 'Unknown',
                            venue: cityMap[setup.city_id] || 'Unknown',
                            location: cityMap[setup.location_id] || 'Unknown',
                            time: setup.from_time || 'Unknown',
                            date: setup.date || 'Unknown',
                            opponent: opponentId,
                            result: isWinner ? 'Won' : 'Lost',
                            created_at: match.created_at
                        };
                    }))
    
                const completedMatches = progressData
                    .filter(match => {
                        const setup = matchSetups.find(s => s.id === match.match);
                        if (!setup) return false;
    
                        // Only include matches where the status is 3 (Completed) and the user is involved
                        return match.status === 3 && match.winner !== null &&
                            (match.requested_by === userId || setup.team_name === userId);
                    })
                    .map(match => {
                        const setup = matchSetups.find(s => s.id === match.match);
                        if (!setup) return null;
    
                        const isWinner = match.winner === userId;
    
                        const opponentId =
                            match.requested_by === userId ? setup.team_name : match.requested_by;
    
                        return {
                            id: match.id,
                            format: formatMap[setup.format_id] || 'Unknown',
                            venue: cityMap[setup.city_id] || 'Unknown',
                            location: cityMap[setup.location_id] || 'Unknown',
                            time: setup.from_time || 'Unknown',
                            date: setup.date || 'Unknown',
                            opponent: opponentId,
                            result: isWinner ? 'Won' : 'Lost',
                            created_at: match.created_at
                        };
                    })
                    .filter(Boolean);  // Ensure we only get valid matches here
    
                // Sort matches by latest first
                const sortedMatches = completedMatches.sort((a, b) =>
                    new Date(b.created_at) - new Date(a.created_at)
                );
    
                // Fetch opponent names
                const opponentIds = [...new Set(sortedMatches.map(m => m.opponent))];
                const opponentProfiles = await Promise.all(
                    opponentIds.map(id =>
                        api.get(`profile/${id}/`).then(res => res.data).catch(() => ({ id, username: 'Unknown' })))
                );
                const opponentMap = {};
                opponentProfiles.forEach(profile => {
                    opponentMap[profile.id] = profile.username;
                });
    
                const finalMatches = sortedMatches.map(match => ({
                    ...match,
                    opponent: opponentMap[match.opponent] || 'Unknown'
                }));
    
                // Apply final frontend filtering
                const filteredMatches = finalMatches.filter(match =>
                    match.opponent.toLowerCase().includes(search.toLowerCase()) &&
                    (filter ? match.format === filter : true) &&
                    (matchResult ? match.result.toLowerCase() === matchResult.toLowerCase() : true)
                );
    
                setMatches(filteredMatches);
                setTotalMatches(filteredMatches.length);
            } catch (error) {
                console.error('Error fetching match history:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchMatchHistory();
    }, [search, filter, matchResult, entries, formats]);
    
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleMatchResultChange = (e) => {
        setMatchResult(e.target.value);
    };

    const handlePageChange = (page) => {
        setEntries(page);
    };

    return (
        <DashboardHeader>
            <Sidebar>
                <div className='match-list' style={{ padding: "20px", width: "100%", backgroundColor: "#f0f0f0", height: "100vh" }}>
                    <div className='match-history-search-section container'>
                        <div className='search-section-a'>
                            <div>
                                Apply Filter
                                <select onChange={handleFilterChange} style={{color:"white"}}>
                                    <option value="">All Formats</option>
                                    {formats.map(format => (
                                        <option key={format.id} value={format.name}>
                                            {format.name} ({format.overs} overs)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                Match Result
                                <select onChange={handleMatchResultChange}>
                                    <option value="">All Results</option>
                                    <option value="won">Won</option>
                                    <option value="lost">Lost</option>
                                </select>
                            </div>
                        </div>
                        <div className='search-section-b'>
                            <input
                                value={search}
                                onChange={handleSearchChange}
                                placeholder='Search by opponent'
                            />
                            <button><CiSearch /></button>
                        </div>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="matches-history-list" style={{ width: "100%" }}>
                            {matches.length > 0 ? (
                                matches.map((match) => (
                                    <div className="match-item" key={match.id}>
                                        <div className="match-header">
                                            <span className="match-format">{match.format}</span>
                                            <span className={`match-result ${match.result.toLowerCase()}`}>{match.result}</span>
                                        </div>
                                        <div className="match-details">
                                            <div className="match-venue">Venue: {match.venue}</div>
                                            <div className="match-location">Location: {match.location}</div>
                                            <div className="match-time">Time: {match.time}</div>
                                        </div>
                                        <div className="match-history">
                                            <div className="history-item"><strong>Opponent:</strong> {match.opponent}</div>
                                            <div className="history-item"><strong>Date:</strong> {match.date}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className='no-matches'>No completed match history available.</p>
                            )}
                        </div>
                    )}
                </div>
            </Sidebar>
        </DashboardHeader>
    );
};

export default MatchesHistory;
