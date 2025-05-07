import React, { useState, useEffect } from 'react';
import './matchesHistory.css';
import { CiSearch } from "react-icons/ci";
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import api from '../../utils/api';
import Loader from '../../components/Loader'; // Assuming you have a loader component

const MatchesHistory = () => {
    const [matches, setMatches] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [entries, setEntries] = useState(10);
    const [matchResult, setMatchResult] = useState('');
    const [totalMatches, setTotalMatches] = useState(0);
    const [loading, setLoading] = useState(true); // Loading state
    const [formats, setFormats] = useState([]); // State for formats

    useEffect(() => {
        const fetchFormats = async () => {
            try {
                const formatsRes = await api.get('formats/');
                setFormats(formatsRes.data); // Store formats in state
            } catch (error) {
                console.error('Error fetching formats:', error);
            }
        };

        fetchFormats();
    }, []);

    useEffect(() => {
        const fetchMatchHistory = async () => {
            try {
                setLoading(true); // Start loading
                const storedProfile = localStorage.getItem("profile");
                const user = JSON.parse(storedProfile);
                const userId = user.id;

                const [progressRes, matchSetupsRes, citiesRes] = await Promise.all([
                    api.get('progress/', {
                        params: {
                            search,
                            filter,  // Send the filter value to backend
                            result: matchResult,
                            page_size: entries,
                        },
                    }),
                    api.get('matchsetups/'),
                    api.get('cities/'), // Assuming you have an endpoint for cities
                ]);

                const progressData = progressRes.data;
                const matchSetups = matchSetupsRes.data;
                const cities = citiesRes.data;

                // Create maps for city (venue)
                const cityMap = Object.fromEntries(cities.map(c => [c.id, c.name]));
                // Create a map for formats for easy lookup
                const formatMap = Object.fromEntries(formats.map(f => [f.id, f.name]));

                // Completed matches only
                const completedMatches = progressData
                    .filter(match => match.winner !== null)
                    .map(match => {
                        const setup = matchSetups.find(s => s.id === match.match);
                        if (!setup) return null;

                        const isWinner = match.winner === userId;

                        return {
                            id: match.id,
                            formatId: setup.format_id || 'Unknown',
                            format: formatMap[setup.format_id] || 'Unknown', // Show the format name
                            venue: cityMap[setup.city_id] || 'Unknown', // Map city_id to venue name
                            location: cityMap[setup.location_id] || 'Unknown', // Using location_id if needed
                            time: setup.from_time || 'Unknown', // Set time to from_time
                            date: setup.date || 'Unknown',
                            opponent: (match.requested_by === userId ? setup.team_name : match.requested_by),
                            result: isWinner ? 'Won' : 'Lost',
                        };
                    })
                    .filter(Boolean); // Remove nulls

                // Now fetch opponent names (profile/<id>/)
                const opponentIds = [...new Set(completedMatches.map(m => m.opponent))];
                const opponentProfiles = await Promise.all(
                    opponentIds.map(id => api.get(`profile/${id}/`).then(res => res.data))
                );
                const opponentMap = {};
                opponentProfiles.forEach(profile => {
                    opponentMap[profile.id] = profile.username;
                });

                // Final map with opponent names
                const finalMatches = completedMatches.map(match => ({
                    ...match,
                    opponent: opponentMap[match.opponent] || 'Unknown'
                }));

                // Apply search and filter
                const filteredMatches = finalMatches.filter(match =>
                    match.opponent.toLowerCase().includes(search.toLowerCase()) &&
                    (filter ? match.format === filter : true) && // Apply format filter by name
                    (matchResult ? match.result.toLowerCase() === matchResult.toLowerCase() : true) // Apply match result filter
                );

                setMatches(filteredMatches);
                setTotalMatches(filteredMatches.length);
            } catch (error) {
                console.error('Error fetching match history:', error);
            } finally {
                setLoading(false); // End loading after data is fetched
            }
        };

        fetchMatchHistory();
    }, [search, filter, matchResult, entries, formats]); // Added formats to dependencies

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
                                <select onChange={handleFilterChange}>
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

                    {/* Show loader while fetching data */}
                    {loading ? (
                        <Loader /> // Display loader component while fetching data
                    ) : (
                        <div className="matches-history-list" style={{ width: "100%" }}>
                            {matches.length > 0 ? (
                                matches.map((match) => (
                                    <div className="match-item" key={match.id}>
                                        <div className="match-header">
                                            <span className="match-format">{match.format}</span> {/* Show format name */}
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
