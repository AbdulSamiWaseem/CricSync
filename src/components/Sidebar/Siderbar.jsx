import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { BsHouse } from "react-icons/bs";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import logo from '../../assets/cricsync.png';

const Sidebar = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* Sidebar - fixed on the left */}
      <div
        className="sidebar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "250px",
          overflowY: "auto",
          backgroundColor: "#fff", // optional: background for clarity
          zIndex: 1000,
        }}
      >
        <img src={logo} style={{ width: "100px", objectFit: "contain", paddingLeft: "10px" }} />
        <ul className="sidebar-menu">
          <Link to="/dashboard">
            <li style={{ backgroundColor: "#9747ff", color: "white", fontWeight: "600", borderRadius: "10px", padding: "10px" }}>
              <RxDashboard size={25} /> Dashboard
            </li>
          </Link>

          <div className="accordion" id="accordionPanelsStayOpenExample">
            {/* Matches */}
            <div className="accordion-item sidebar-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button sidebar-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseMatches"
                  aria-expanded="true"
                  aria-controls="collapseMatches"
                >
                  <BsHouse size={25} /> Matches
                </button>
              </h2>
              <div id="collapseMatches" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <Link to="/matches/list" style={{ textDecoration: 'none' }}><li><FaRegCircle /> List</li></Link>
                  <Link to="/matches/my-matches" style={{ textDecoration: 'none' }}><li><FaRegCircle /> My Matches</li></Link>
                  <Link to="/matches/match-setup" style={{ textDecoration: 'none' }}><li><FaRegCircle /> Match Setup</li></Link>
                </div>
              </div>
            </div>

            {/* Tournament */}
            <div className="accordion-item sidebar-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button sidebar-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTournament"
                  aria-expanded="false"
                  aria-controls="collapseTournament"
                >
                  <RiCheckboxMultipleLine size={25} /> Tournament
                </button>
              </h2>
              <div id="collapseTournament" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <Link to="/tournament/list" style={{ textDecoration: 'none' }}><li><FaRegCircle /> List</li></Link>
                  <Link to="/tournament/my-tournaments" style={{ textDecoration: 'none' }}><li><FaRegCircle /> My Tournaments</li></Link>
                  <Link to="/tournament/tournament-setup" style={{ textDecoration: 'none' }}><li><FaRegCircle /> Tournament Setup</li></Link>
                </div>
              </div>
            </div>

            {/* Teams */}
            <div className="accordion-item sidebar-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button sidebar-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTeams"
                  aria-expanded="true"
                  aria-controls="collapseTeams"
                >
                  <BsHouse size={25} /> Teams
                </button>
              </h2>
              <div id="collapseTeams" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <Link to="/teams/list" style={{ textDecoration: 'none' }}><li><FaRegCircle /> List</li></Link>
                  <Link to="/teams/following-teams" style={{ textDecoration: 'none' }}><li><FaRegCircle /> Following Teams</li></Link>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className='accordion-item sidebar-item'>
              <div className='accordion-body' style={{ padding: "16px 20px" }}>
                <Link to="/settings" ><li style={{ padding: "0" }}><FaPen size={25} /> Settings</li></Link>
              </div>
            </div>
          </div>
        </ul>
      </div>

      {/* Main Content Area - pushed to the right of sidebar */}
      <div style={{ marginLeft: "250px", width: "80%" }}>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
