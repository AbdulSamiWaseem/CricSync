import React, { useState, useEffect } from 'react';
import './matchList.css';
import { CiFilter, CiSearch } from "react-icons/ci";
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import api from '../../utils/api';

const MatchList = () => {
    const [matches, setMatches] = useState([]);
    const [cities, setCities] = useState([]);
    const [locations, setLocations] = useState([]);
    const [formats, setFormats] = useState([]);
    const [profiles, setProfiles] = useState({}); // Store fetched team profiles

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
        fetchLookups();
        fetchMatches();
    }, []);

    const fetchLookups = async () => {
        try {
            const [citiesRes, locationsRes, formatsRes] = await Promise.all([
                api.get('/cities/'),
                api.get('/locations/'),
                api.get('/formats/')
            ]);
            setCities(citiesRes.data);
            setLocations(locationsRes.data);
            setFormats(formatsRes.data);
        } catch (err) {
            console.error("Failed to fetch lookup data", err);
        }
    };

    const fetchMatches = async () => {
        try {
            const response = await api.get('/matchsetups/', {
                params: {
                    ...filters,
                    limit: entries
                }
            });

            const matchData = response.data;
            setMatches(matchData);

            // Fetch team profile names
            const uniqueTeamIds = [...new Set(matchData.map(m => m.team_name))];

            const profileResponses = await Promise.all(
                uniqueTeamIds.map(id =>
                    api.get(`/profile/${id}`).then(res => ({ id, username: res.data.username })).catch(() => ({ id, username: 'Unknown' }))
                )
            );

            const profileMap = {};
            profileResponses.forEach(({ id, username }) => {
                profileMap[id] = username;
            });

            setProfiles(profileMap);

        } catch (err) {
            console.error('Failed to fetch matches or profiles:', err);
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
        fetchMatches(); // update match list when entries per page changes
    };

    const handleRequestMatch = (matchId) => {
        alert(`Requested match with ID: ${matchId}`);
    };

    const getCityName = (id) => {
        const city = cities.find(c => Number(c.id) === Number(id));
        return city ? city.name : 'Unknown';
    };

    const getLocationName = (id) => {
        const location = locations.find(l => Number(l.id) === Number(id));
        return location ? location.name : 'Unknown';
    };

    const getFormatName = (id) => {
        const format = formats.find(f => Number(f.id) === Number(id));
        return format ? format.name : 'Unknown';
    };

    const getTeamName = (id) => {
        return profiles?.[id] || 'Unknown';
    };

    return (
        <DashboardHeader>
            <Sidebar>
                <div className='match-list-page' style={{ padding: "20px", width: "100%", backgroundColor: "#f0f0f0", minHeight: "100vh" }}>

                    {/* Filters */}
                    <div className='match-filter container'>
                        <select name="city" onChange={handleChange}>
                            <option value="">City</option>
                            {cities.map(city => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </select>
                        <select name="area" onChange={handleChange}>
                            <option value="">Area</option>
                            {locations.map(loc => (
                                <option key={loc.id} value={loc.id}>{loc.name}</option>
                            ))}
                        </select>
                        <input type="date" name="date" onChange={handleChange} />
                        <input type="time" name="time" onChange={handleChange} />
                        <select name="match_type" onChange={handleChange}>
                            <option value="">Match Type</option>
                            <option value="Friendly">Friendly</option>
                            <option value="Tournament">Tournament</option>
                        </select>
                        <select name="format" onChange={handleChange}>
                            <option value="">Format</option>
                            {formats.map(format => (
                                <option key={format.id} value={format.id}>{format.name}</option>
                            ))}
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

                    {/* Match Cards */}
                    <div className="match-list">
                        {matches.length === 0 ? (
                            <p>No matches found.</p>
                        ) : (
                            matches.map((match) => (
                                <div className="match-card" key={match.id}>
                                    <div className="match-card-header">
                                        <span className="match-format">{getFormatName(match.format_id)}</span>
                                        <span className="match-overs">From {match.from_time} to {match.to_time}</span>
                                    </div>

                                    <div className="match-card-body">
                                        <div className="match-info">
                                            <div><strong>City:</strong> {getCityName(match.city_id)}</div>
                                            <div><strong>Location:</strong> {getLocationName(match.location_id)}</div>
                                            <div><strong>Date:</strong> {match.date}</div>
                                            <div><strong>Requested By:</strong> {getTeamName(match.team_name)}</div>
                                        </div>
                                    </div>

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
