import React, { useState, useEffect, useMemo } from 'react';
import './matchList.css';
import { CiFilter, CiSearch } from "react-icons/ci";
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
import api from '../../utils/api';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { IoSend } from "react-icons/io5";
import { MdOutlineCallReceived } from "react-icons/md";

const MatchList = () => {
    const [matches, setMatches] = useState([]);
    const [cities, setCities] = useState([]);
    const [locations, setLocations] = useState([]);
    const [formats, setFormats] = useState([]);
    const [profiles, setProfiles] = useState({});
    const [actionLoading, setActionLoading] = useState({});
    const [user, setUser] = useState({ id: null, is_staff: false });
    const [showModal, setShowModal] = useState(false);
    const [selectedMatchRequests, setSelectedMatchRequests] = useState([]);
    const [selectedMatchId, setSelectedMatchId] = useState(null);

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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchLookups();
        fetchMatches();
    }, []);

    const openAcceptModal = async (matchId) => {
        setSelectedMatchId(matchId);
        setShowModal(true);
        setLoading(true);
        try {
            const res = await api.get(`/match/${matchId}/requests/`);
            setSelectedMatchRequests(res.data);
        } catch (error) {
            toast.error('Failed to load match requests');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const acceptMatchRequest = async (requestId) => {
        setActionLoading(prev => ({ ...prev, [requestId]: true }));
        try {
            await api.post('/match/accept/', { mip_id: requestId });
            toast.success("Match accepted successfully!");
            setShowModal(false);
            fetchMatches(); // refresh list
        } catch (error) {
            toast.error("Failed to accept match.");
            console.error(error);
        } finally {
            setActionLoading(prev => ({ ...prev, [requestId]: false }));
        }
    };

    const fetchLookups = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const fetchMatches = async () => {
        setLoading(true);
        try {
            // Step 1: Fetch matches
            const matchResponse = await api.get('/matchsetups/', { params: { limit: entries } });
            const matchData = matchResponse.data;
    
            // Step 2: Fetch progress data
            const progressResponse = await api.get('/progress/');
            const progressData = progressResponse.data;
    
            // Step 3: Build a set of match IDs with status 2 or 3
            const excludedMatchIds = new Set(
                progressData
                    .filter(p => p.status === 2 || p.status === 3)
                    .map(p => p.match)
            );
    
            // Step 4: Filter matches
            const filteredMatches = matchData.filter(m => !excludedMatchIds.has(m.id));
    
            // Step 5: Sort latest first
            const sorted = filteredMatches.sort((a, b) => 
                new Date(b.date + ' ' + b.from_time) - new Date(a.date + ' ' + a.from_time)
            );
    
            setMatches(sorted);
    
            // Step 6: Load unique team profile usernames
            const uniqueTeamIds = [...new Set(filteredMatches.map(m => m.team_name))];
            const profileResponses = await Promise.all(
                uniqueTeamIds.map(id =>
                    api.get(`/profile/${id}/`).then(res => ({ id, username: res.data.username })).catch(() => ({ id, username: 'Unknown' }))
                )
            );
            const profileMap = {};
            profileResponses.forEach(({ id, username }) => {
                profileMap[id] = username;
            });
            setProfiles(profileMap);
    
            // Step 7: Set user data
            const userRes = await api.get('/profile/');
            setUser({ id: userRes.data.id, is_staff: userRes.data.is_staff });
    
        } catch (err) {
            console.error('Error fetching matches or progress data:', err);
        } finally {
            setLoading(false);
        }
    };
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'city') {
            setFilters(prev => ({ ...prev, city: value, area: '' }));
        } else {
            setFilters(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSearchChange = (e) => {
        setFilters(prev => ({ ...prev, search: e.target.value }));
    };

    const handleApplyFilter = () => {
        fetchMatches();
    };

    const handleRequestMatch = async (matchId) => {
        if (!window.confirm("Are you sure you want to request this match?")) return;

        setActionLoading(prev => ({ ...prev, [matchId]: true }));
        try {
            await api.post('/match/request/', { match_id: matchId });
            toast.success('Match requested successfully!');
            fetchMatches();
        } catch (error) {
            toast.error('You already requested to that match.');
            console.error(error);
        } finally {
            setActionLoading(prev => ({ ...prev, [matchId]: false }));
        }
    };

    const handleDelete = async (matchId) => {
        if (!window.confirm("Are you sure you want to delete this match?")) return;

        setActionLoading(prev => ({ ...prev, [matchId]: true }));
        try {
            await api.delete(`/match/${matchId}/delete/`);
            toast.success('Match deleted successfully!');
            fetchMatches();
        } catch (error) {
            toast.error('This Match is Scheduled you cannot delete that!');
            console.error(error);
        } finally {
            setActionLoading(prev => ({ ...prev, [matchId]: false }));
        }
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

    const filteredLocations = useMemo(() => {
        if (!filters.city) return locations;
        return locations.filter(loc => Number(loc.city_id) === Number(filters.city));
    }, [filters.city, locations]);

    const filteredMatches = useMemo(() => {
        return matches.filter(match => {
            const city = getCityName(match.city_id).toLowerCase();
            const location = getLocationName(match.location_id).toLowerCase();
            const format = getFormatName(match.format_id).toLowerCase();
            const team = getTeamName(match.team_name).toLowerCase();
            const searchTerm = filters.search.toLowerCase();

            return (
                (!filters.city || String(match.city_id) === filters.city) &&
                (!filters.area || String(match.location_id) === filters.area) &&
                (!filters.date || match.date === filters.date) &&
                (!filters.time || match.from_time === filters.time || match.to_time === filters.time) &&
                (!filters.match_type || match.match_type === filters.match_type) &&
                (!filters.format || String(match.format_id) === filters.format) &&
                (!searchTerm || city.includes(searchTerm) || location.includes(searchTerm) || format.includes(searchTerm) || team.includes(searchTerm))
            );
        });
    }, [matches, filters]);

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
                            {filteredLocations.map(loc => (
                                <option key={loc.id} value={loc.id}>{loc.name}</option>
                            ))}
                        </select>
                        <input type="date" name="date" onChange={handleChange} />
                        <input type="time" name="time" onChange={handleChange} />

                        <select name="format" onChange={handleChange}>
                            <option value="">Format</option>
                            {formats.map(format => (
                                <option key={format.id} value={format.id}>{format.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Search */}
                    <div className='match-search-section container'>
                        <div className='search-section-a'>
                            <button className='apply-filter-btn' onClick={handleApplyFilter}>
                                Apply Filter <CiFilter style={{ marginLeft: '5px' }} />
                            </button>
                        </div>
                        <div className='search-section-b'>
                            <input placeholder='Search' value={filters.search} onChange={handleSearchChange} />
                            <button onClick={handleApplyFilter}><CiSearch /></button>
                        </div>
                    </div>

                    {loading && <Loader />}

                    <div className="match-list">
                        {filteredMatches.length === 0 && !loading ? (
                            <p className='no-matches'>No matches found.</p>
                        ) : (
                            filteredMatches.map((match) => (
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
                                        {/* Accept button only shown for matches created by the logged-in user */}
                                        {match.team_name === user.id && !user.is_staff && (
                                            <button onClick={() => openAcceptModal(match.id)} disabled={!!actionLoading[match.id]}>
                                                <MdOutlineCallReceived/>
                                                Accept {actionLoading[match.id] && <span className="button-spinner"></span>}
                                            </button>
                                        )}

                                        {user.is_staff && (
                                            <button onClick={() => handleDelete(match.id)} disabled={!!actionLoading[match.id]}>
                                                Delete {actionLoading[match.id] && <span className="button-spinner"></span>}
                                            </button>
                                        )}

                                        {match.team_name !== user.id && !user.is_staff && (
                                            <button className="request-btn" onClick={() => handleRequestMatch(match.id)} disabled={!!actionLoading[match.id]}>
                                                <IoSend/> Request
                                                {actionLoading[match.id] && <span className="button-spinner"></span>}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {showModal && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h2>Select a Team to Accept</h2>
                                {selectedMatchRequests.length === 0 ? (
                                    <p>No requests found for this match.</p>
                                ) : (
                                    <ul className="request-user-list">
                                        {selectedMatchRequests.map(req => (
                                            <li key={req.id} className="request-user-item">
                                                <img src={`${process.env.REACT_APP_BASE_URL}${req.requested_by.profile_picture}`} alt={req.requested_by.username} />
                                                <div>
                                                    <p><strong>{req.requested_by.username}</strong></p>
                                                    <p>{req.requested_by.email}</p>
                                                    <p>{req.requested_by.phone_number}</p>
                                                </div>
                                                <button onClick={() => acceptMatchRequest(req.id)} disabled={!!actionLoading[req.id]}>
                                                    <MdOutlineCallReceived/>
                                                    Accept {actionLoading[req.id] && <span className="button-spinner"></span>}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <button className="close-modal-btn" onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </Sidebar>
        </DashboardHeader>
    );
};

export default MatchList;
