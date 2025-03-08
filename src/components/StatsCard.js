import React from 'react';

const StatsCard = ({ title, count, icon, color1, color2 }) => {
  return (
    <div style={{
      padding: "15px",
      borderRadius: "10px",
      height: "100px",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      background: `linear-gradient(to right, ${color1}, ${color2})`,
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <h5>{title}</h5>
          <p>{count}</p>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "20px",
          backgroundColor: color1,
          height: "60px",
          marginLeft: "10px",
          padding: "10px",
        }}>
          <img src={icon} style={{width:"40px"}}></img>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
