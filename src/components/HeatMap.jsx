import React from 'react';
import { MapPin } from 'lucide-react';

const HeatMap = ({ zones, isEmergency, isPreCheckin }) => {
  const getColor = (level) => {
    switch (level) {
      case 'clear': return 'var(--status-clear)';
      case 'moderate': return 'var(--status-moderate)';
      case 'congested': return 'var(--status-congested)';
      default: return '#334155';
    }
  };

  return (
    <div className="heatmap-container">
      <div className="stadium-graphic">
        {/* Simple Abstract Stadium Representation */}
        <svg viewBox="0 0 800 800" className="stadium-svg">
          {/* Ground Background */}
          <circle cx="400" cy="400" r="340" fill="#0f172a" stroke="#1e293b" strokeWidth="8" />
          {/* Stands around the pitch (Simplified blocks) */}
          <circle cx="400" cy="400" r="260" fill="none" stroke="#b45309" strokeWidth="55" opacity="0.3" strokeDasharray="100 20" />
          {/* Cricket Field */}
          <circle cx="400" cy="400" r="190" fill="#166534" opacity="0.5" />
          {/* Pitch */}
          <rect x="385" y="340" width="30" height="120" fill="#854d0e" opacity="0.5" />
          
          {/* Heatmap Zones (Live Movement) */}
          {!isPreCheckin && !isEmergency && zones.map((zone) => (
            <g key={zone.id} className="zone-group">
              <circle 
                cx={zone.x} 
                cy={zone.y} 
                r={zone.radius} 
                fill={getColor(zone.status)} 
                className={`zone-pulse ${zone.status}`}
                opacity="0.6"
              />
              <circle cx={zone.x} cy={zone.y} r="6" fill="#fff" />
              <text x={zone.x} y={zone.y + 18} textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">{zone.name}</text>
            </g>
          ))}

          {/* Seat Location (Persistent) */}
          {!isEmergency && (
            <g className="seat-location">
              <circle cx="400" cy="220" r={isPreCheckin ? 15 : 10} fill="#3b82f6" className="zone-pulse" opacity="0.8" />
              <circle cx="400" cy="220" r="4" fill="#fff" />
              <text x="400" y="240" fill="#3b82f6" fontSize="12" fontWeight="bold" textAnchor="middle">
                {isPreCheckin ? "Your Seat" : "Assigned Seat"}
              </text>
            </g>
          )}

          {/* Live User Location */}
          {!isPreCheckin && !isEmergency && (
            <g className="user-location">
              <circle cx="600" cy="450" r="12" fill="rgba(59, 130, 246, 0.4)" className="pulse" />
              <circle cx="600" cy="450" r="6" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
              <text x="600" y="475" fill="#3b82f6" fontSize="12" fontWeight="bold" textAnchor="middle">You</text>
            </g>
          )}

          {isEmergency && (
            <>
              {/* Highlight Exit */}
              <circle cx="740" cy="650" r="45" fill="rgba(239, 68, 68, 0.4)" className="zone-pulse" />
              <circle cx="740" cy="650" r="15" fill="#ef4444" />
              
              {/* User Location */}
              <circle cx="600" cy="550" r="8" fill="#3b82f6" />
              <text x="600" y="535" fill="#3b82f6" fontSize="16" fontWeight="bold" textAnchor="middle">You</text>

              {/* Path Line */}
              <line 
                x1="600" y1="550" 
                x2="740" y2="650" 
                stroke="#ef4444" 
                strokeWidth="6" 
                strokeDasharray="15 10" 
                className="escape-path"
              />
            </>
          )}
        </svg>
      </div>

      {!isPreCheckin && (
        <div className="legend">
          <div className="legend-item">
            <span className="dot clear"></span> Clear
          </div>
          <div className="legend-item">
            <span className="dot moderate"></span> Moderate
          </div>
          <div className="legend-item">
            <span className="dot congested"></span> Congested
          </div>
        </div>
      )}
    </div>
  );
};

export default HeatMap;
