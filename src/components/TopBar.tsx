import React from 'react';
import { ChevronRight, RefreshCw } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="top-bar">
      <div className="breadcrumb">
        <span>MicroCloud</span>
        <ChevronRight style={{ width: '16px', height: '16px' }} />
        <span className="current">Overview Dashboard</span>
        <span className="project-badge" id="current-project">
          Production
        </span>
      </div>

      <div className="top-controls">
        <select className="project-selector">
          <option value="all">All Projects</option>
          <option value="production" selected>
            Production
          </option>
          <option value="staging">Staging</option>
          <option value="development">Development</option>
          <option value="testing">Testing</option>
        </select>

        <select className="time-range">
          <option>Last 1 hour</option>
          <option>Last 6 hours</option>
          <option selected>Last 24 hours</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>

        <div className="refresh-controls">
          <button className="auto-refresh">
            <div className="live-dot"></div>
            Auto: 30s
          </button>
          <button className="global-refresh">
            <RefreshCw style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;