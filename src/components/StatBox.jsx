import React from 'react';
import './StatBox.css'; 

const StatBox = ({ title, stats, bgColor, titleColor }) => {
    return (
        <div className="stat-box" style={{ backgroundColor: bgColor }}>
            <div className="stat-title" style={{ backgroundColor: titleColor }}>
                {title}
            </div>
            <div className="stat-values">
                {stats.map((label, index) => (
                    <div key={index} className="stat-item">
                        <div className="stat-value">0</div>
                        <div className="stat-label">{label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatBox;
