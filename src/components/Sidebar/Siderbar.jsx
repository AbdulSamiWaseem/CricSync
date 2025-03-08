import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { BsHouse } from "react-icons/bs";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import logo from '../../assets/cricsync.png'
const Sidebar = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row",height:"100vh" }}>
      <div className="sidebar" style={{ position: "absolute", top: 0, left: 0 }}>
        <img src={logo} style={{ width: "100px", objectFit: "contain",paddingLeft:"10px" }} />
        <ul className="sidebar-menu">
          <Link to="/"><li style={{ backgroundColor: "#9747ff", color: "white", fontWeight: "600", borderRadius: "10px", padding: "10px" }}><RxDashboard size={25} /> Dashboard</li></Link>
          <div className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item sidebar-item">
              <h2 className="accordion-header">
                <button className="accordion-button sidebar-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  <BsHouse size={25} /> Matches
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <Link to="/matches/list"><li><FaRegCircle /> List</li></Link>
                  {/* <Link to="/properties/addNew"><li><FaRegCircle/> Add New</li></Link> */}
                </div>
              </div>
            </div>
            <div className="accordion-item sidebar-item">
              <h2 className="accordion-header">
                <button className="accordion-button sidebar-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                  <RiCheckboxMultipleLine size={25} /> Match Setup
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <Link to="/propertySetup/create-match"><li><FaRegCircle /> Create Match</li></Link>
                </div>
              </div>
            </div>
            <div className='accordion-item sidebar-item'>
              <div className='accordion-body' style={{ padding: "16px 20px" }}>
                <Link to="/roles&permission"><li style={{ padding: "0" }}><FaPen size={25} /> Roles & Permission</li></Link>
              </div>
            </div>
            <div className='accordion-item sidebar-item'>
              <div className='accordion-body' style={{ padding: "16px 20px" }}>
                <Link to="/settings"><li style={{ padding: "0" }}><FaPen size={25} /> Settings</li></Link>
              </div>
            </div>
          </div>

        </ul>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
