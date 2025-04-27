import React, { useState, useEffect } from 'react';
import './matchesHistory.css';
import { CiFilter, CiSearch } from "react-icons/ci";
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import axios from 'axios'; // Import axios for API requests

const MatchesHistory = () => {
    const [matches, setMatches] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [entries, setEntries] = useState(10);
    const [matchResult, setMatchResult] = useState(''); // Track win/loss status
    useEffect(() => {
        const fetchMatchHistory = async () => {
            try {
                // Mock API Response
                const response = {
                    data: [
                        {
                            id: 1,
                            result: "Won",
                            format: "T20",
                            venue: "FAST",
                            location: "Lahore",
                            time: "2025-04-20 15:00",
                            opponent: "PU",
                            date: "2025-04-20"
                        },
                        {
                            id: 2,
                            result: "Lost",
                            format: "ODI",
                            venue: "Test",
                            location: "FAST",
                            time: "2025-04-21 18:00",
                            opponent: "GIKI",
                            date: "2025-04-21"
                        },
                        {
                            id: 3,
                            result: "Won",
                            format: "TEST",
                            venue: "International Arena",
                            location: "Sanagala",
                            time: "2025-04-22 10:00",
                            opponent: "FAST",
                            date: "2025-04-22"
                        },
                        {
                            id: 4,
                            result: "Lost",
                            format: "T10",
                            venue: "Lahore",
                            location: "LUMS",
                            time: "2025-04-23 20:00",
                            opponent: "LUMS",
                            date: "2025-04-23"
                        },
                        {
                            id: 5,
                            result: "Won",
                            format: "ODI",
                            venue: "National Stadium ",
                            location: "Karachi",
                            time: "2025-04-24 12:30",
                            opponent: "Lahore qalanadar",
                            date: "2025-04-24"
                        },
                        {
                            id: 6,
                            result: "Lost",
                            format: "T20",
                            venue: "Lahore",
                            location: "Gadafi",
                            time: "2025-04-25 14:00",
                            opponent: "Zalmi",
                            date: "2025-04-25"
                        }
                    ]
                };

                // Simulate API response
                setMatches(response.data);
            } catch (error) {
                console.error('Error fetching match history:', error);
            }
        };

        fetchMatchHistory();
    }, [search, filter, matchResult]);

    // Fetch match history from the backend
    // useEffect(() => {
    //     const fetchMatchHistory = async () => {
    //         try {
    //             const response = await axios.get('http://127.0.0.1:8000/api/match-history/', {
    //                 params: {
    //                     search: search,
    //                     filter: filter,
    //                     result: matchResult, // Filter by win/loss
    //                 },
    //             });
    //             setMatches(response.data);
    //         } catch (error) {
    //             console.error('Error fetching match history:', error);
    //         }
    //     };

    //     fetchMatchHistory();
    // }, [search, filter, matchResult]);

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

                    <div className="matches-history-list" style={{width:"100%"}}>
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
