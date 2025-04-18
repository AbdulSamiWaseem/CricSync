import React from 'react'
import MatchesList from '../components/MatchesList'
import './matchSetup.css'
import { CiFilter } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Sidebar from '../components/Sidebar/Siderbar';
const MatchSetup = () => {
    return (
        <DashboardHeader>
<Sidebar>
  <div
    className="match-setup"
    style={{
      padding: "20px",
      width: "100%",
      backgroundColor: "#f0f0f0",
      height: "100vh",
    }}
  >
    <div className="match-setup-section container">
      <div className="form-container">
        <div className="first-col">
          <div className="form-group">
            <label className="item1">Input City</label>
            <input type="text" placeholder="Type here" />
          </div>
          <div className="form-group">
            <label className="item2">Input Date</label>
            <input type="text" placeholder="Type here" />
          </div>
        </div>
        <div className="second-col">
          <div className="form-group">
            <label className="item1">Input Area</label>
            <input type="text" placeholder="Type here" />
          </div>
          <div className="form-group">
            <label className="item2">Input Time</label>
            <input type="text" placeholder="Type here" />
          </div>
        </div>
        
      </div>
<div className="dropdown-wrapper">
  <div className="dropdown-1">
    <label>Select Format</label>
    <select>
      <option>5-over</option>
      <option>10-over</option>
      <option>20-over</option>
      <option>50-over</option>
    </select>
  </div>

  <div className="dropdown-2">
    <label>Select Match Type</label>
    <select>
      <option>Quick</option>
      <option>Tournament</option>
    </select>
  </div>
</div>

      <div className="submit">
        <button className="submit-btn">Submit</button>
      </div>
    </div>
  </div>
</Sidebar>

        </DashboardHeader>
    )
}
export default MatchSetup