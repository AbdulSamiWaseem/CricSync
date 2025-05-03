import React, { useState, useEffect } from 'react';
import './matchesHistory.css';
import { CiFilter, CiSearch } from "react-icons/ci";
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import api from '../../utils/api'; // Use your api.js for handling requests

const MatchesHistory = () => {
    const [matches, setMatches] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [entries, setEntries] = useState(10);
    const [matchResult, setMatchResult] = useState('');

    useEffect(() => {
        const fetchMatchHistory = async () => {
            try {
                // Fetch match history with filters from backend
                const response = await api.get('match-history/', {
                    params: {
                        search: search,
                        filter: filter,
                        result: matchResult, // Filter by win/loss
                    },
                });

                setMatches(response.data);
            } catch (error) {
                console.error('Error fetching match history:', error);
            }
        };

        fetchMatchHistory();
    }, [search, filter, matchResult, entries]);  // Add entries to re-fetch if pagination changes

    // Handle changes in search input
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Handle changes in filter (match type)
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    // Handle changes in entries per page
    const handleEntriesChange = (e) => {
        setEntries(e.target.value);
    };

    // Handle changes in win/loss filter
    const handleMatchResultChange = (e) => {
        setMatchResult(e.target.value);
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
                                    <option value="">All</option>
                                    <option value="T10">T10</option>
                                    <option value="T20">T20</option>
                                    <option value="ODI">ODI</option>
                                    <option value="TEST">TEST</option>
                                </select>
                            </div>
                            <div>
                                Show Entries
                                <select onChange={handleEntriesChange}>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
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
                                placeholder='Search'
                            />
                            <button><CiSearch /></button>
                        </div>
                    </div>

                    <div className="matches-history-list" style={{ width: "100%" }}>
                        {matches.length > 0 ? (
                            matches.slice(0, entries).map((match) => (
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
                            <p>No match history available.</p>
                        )}
                    </div>
                </div>
            </Sidebar>
        </DashboardHeader>
    );
};

export default MatchesHistory;
