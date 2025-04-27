import React, { useState, useEffect } from 'react';
import './matchList.css';
import { CiFilter, CiSearch } from "react-icons/ci";
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import axios from 'axios';

const MatchList = () => {
    const [matches, setMatches] = useState([]);
    const [filters, setFilters] = useState({
        city: '',
        area: '',
        date: '',
        time: '',
        match_type: '',
        format: '',
        search: ''
    });
    const [entries, setEntries] = useState(10);

    useEffect(() => {
        setMatches([
            {
                id: 1,
                format: 'T20',
                overs: 20,
                venue: 'Gaddafi Stadium',
                location: 'Lahore',
                date: '2025-05-01',
                time: '15:00',
                requesting_team: 'Lahore Lions'
            },
            {
                id: 2,
                format: 'T10',
                overs: 10,
                venue: 'DHA Sports Complex',
                location: 'Lahore',
                date: '2025-05-02',
                time: '18:00',
                requesting_team: 'DHA Gladiators'
            }
        ]);
    }, []);

    const fetchMatches = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/matches/', {
                params: {
                    ...filters,
                    limit: entries
                }
            });
            setMatches(response.data);
        } catch (err) {
            console.error('Failed to fetch matches:', err);
        }
    };

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearchChange = (e) => {
        setFilters({ ...filters, search: e.target.value });
    };

    const handleApplyFilter = () => {
        fetchMatches();
    };

    const handleEntriesChange = (e) => {
        setEntries(e.target.value);
    };

    const handleRequestMatch = (matchId) => {
        alert(`Requested match with ID: ${matchId}`);
        // Later you can call API here
    };

    return (
        <DashboardHeader>
            <Sidebar>
                <div className='match-list-page' style={{ padding: "20px", width: "100%", backgroundColor: "#f0f0f0", minHeight: "100vh" }}>

                    {/* Filters */}
                    <div className='match-filter container'>
                        <select name="city" onChange={handleChange}><option value="">City</option><option value="Lahore">Lahore</option></select>
                        <select name="area" onChange={handleChange}><option value="">Area</option><option value="DHA">DHA</option></select>
                        <input type="date" name="date" onChange={handleChange} />
                        <input type="time" name="time" onChange={handleChange} />
                        <select name="match_type" onChange={handleChange}><option value="">Match Type</option><option value="Friendly">Friendly</option></select>
                        <select name="format" onChange={handleChange}>
                            <option value="">Format</option>
                            <option value="T20">T20</option>
                            <option value="T10">T10</option>
                            <option value="ODI">ODI</option>
                        </select>
                    </div>

                    {/* Search and Entries */}
                    <div className='match-search-section container'>
                        <div className='search-section-a'>
                            <button className='apply-filter-btn' onClick={handleApplyFilter}>
                                Apply Filter <CiFilter style={{ marginLeft: '5px' }} />
                            </button>
                            <div className='show-entries'>
                                Show Entries
                                <select value={entries} onChange={handleEntriesChange}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                        <div className='search-section-b'>
                            <input placeholder='Search' value={filters.search} onChange={handleSearchChange} />
                            <button onClick={handleApplyFilter}><CiSearch /></button>
                        </div>
                    </div>

                    {/* Matches Cards */}
                    <div className="match-list">
                        {matches.length === 0 ? (
                            <p>No matches found.</p>
                        ) : (
                            matches.map((match) => (
                                <div className="match-card" key={match.id}>
                                    <div className="match-card-header">
                                        <span className="match-format">{match.format}</span>
                                        <span className="match-overs">{match.overs} Overs</span>
                                    </div>

                                    <div className="match-card-body">
                                        <div className="match-info">
                                            <div><strong>Venue:</strong> {match.venue}</div>
                                            <div><strong>Location:</strong> {match.location}</div>
                                            <div><strong>Date:</strong> {match.date}</div>
                                            <div><strong>Time:</strong> {match.time}</div>
                                            <div><strong>Requested By:</strong> {match.requesting_team}</div>
                                        </div>
                                    </div>

                                    {/* Request Match Button */}
                                    <div className="match-request-btn">
                                        <button onClick={() => handleRequestMatch(match.id)}>
                                            Request Match
                                        </button>
                                    </div>

                                </div>
                            ))
                        )}
                    </div>

                </div>
            </Sidebar>
        </DashboardHeader>
    );
};

export default MatchList;
