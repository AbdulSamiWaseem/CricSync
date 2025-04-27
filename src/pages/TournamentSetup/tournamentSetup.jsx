import React from 'react';
import './tournamentSetup.css';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Siderbar';
const TournamentSetup = () => {
  return (
    <DashboardHeader>
      <Sidebar>
        <div
          className="tournament-setup"
          style={{
            padding: '20px',
            width: '100%',
            backgroundColor: '#f0f0f0',
            height: '100vh',
          }}
        >
          <div className="tournament-setup-section container">
            <div className="form-container">
              <div className="first-col">
                <div className="form-group">
                  <label>Input City</label>
                  <input type="text" placeholder="Type here" />
                </div>
                <div className="form-group">
                  <label>Input Start Date</label>
                  <input type="text" placeholder="Type here" />
                </div>
                <div className="form-group">
                  <label>Input number of teams</label>
                  <input type="text" placeholder="Type here" />
                </div>
              </div>

              <div className="second-col">
                <div className="form-group">
                  <label>Input Area</label>
                  <input type="text" placeholder="Type here" />
                </div>
                <div className="form-group">
                  <label>Input End Date</label>
                  <input type="text" placeholder="Type here" />
                </div>
                <div className="form-group">
                  <label>Input number of venues</label>
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
  );
};

export default TournamentSetup;
