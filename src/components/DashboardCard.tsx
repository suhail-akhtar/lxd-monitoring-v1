import React from 'react';
import { RefreshCw, Maximize2, AlertTriangle } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  onRefresh: () => void;
  onMaximize?: () => void;
  children: React.ReactNode;
  className?: string;
  liveIndicator?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  loading,
  error,
  lastUpdated,
  onRefresh,
  onMaximize,
  children,
  className = '',
  liveIndicator = false
}) => {
  return (
    <div className={`panel ${className}`}>
      <div className="panel-header">
        <div className="panel-title">
          {icon}
          {title}
          {liveIndicator && (
            <span className="live-indicator">
              <div className="live-dot"></div>
              Live
            </span>
          )}
        </div>
        <div className="panel-actions">
          <button 
            className="panel-btn" 
            onClick={onRefresh}
            disabled={loading}
            title={lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Refresh'}
          >
            <RefreshCw 
              style={{ width: '14px', height: '14px' }} 
              className={loading ? 'animate-spin' : ''}
            />
          </button>
          {onMaximize && (
            <button className="panel-btn" onClick={onMaximize}>
              <Maximize2 style={{ width: '14px', height: '14px' }} />
            </button>
          )}
        </div>
      </div>
      <div className="panel-content">
        {error ? (
          <div className="error-state">
            <AlertTriangle style={{ width: '24px', height: '24px', color: '#f85149' }} />
            <p style={{ color: '#f85149', marginTop: '0.5rem' }}>{error}</p>
            <button onClick={onRefresh} className="panel-btn" style={{ marginTop: '1rem' }}>
              Try Again
            </button>
          </div>
        ) : loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default DashboardCard;