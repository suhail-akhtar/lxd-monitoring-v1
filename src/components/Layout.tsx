// src/components/Layout.tsx - Fixed version without useDashboard at layout level
import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Dashboard from './Dashboard';
import Instances from './Instances';
import ClusterNodes from './ClusterNodes';
import Networks from './Networks';
import Storage from './Storage';
import Operations from './Operations';
import EventsLogs from './EventsLogs';
import Projects from './Projects';
import Metrics from './Metrics';
import type { PageType } from '../App';

interface LayoutProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const Layout: React.FC<LayoutProps> = ({ currentPage, onPageChange }) => {
  const renderContent = () => {
    switch (currentPage) {
      case 'overview':
        return <Dashboard />;
      case 'instances':
        return <Instances />;
      case 'cluster-nodes':
        return <ClusterNodes />;
      case 'networks':
        return <Networks />;
      case 'storage':
        return <Storage />;
      case 'operations':
        return <Operations />;
      case 'events':
        return <EventsLogs />;
      case 'metrics':
        return <Metrics />;
      case 'projects':
        return <Projects />;
      default:
        return <Dashboard />;
    }
  };

  // Simple refresh function that can be used by any page
  const handleRefresh = () => {
    // Force a page refresh for now - individual pages will handle their own refresh
    window.location.reload();
  };

  return (
    <div className="flex">
      <Sidebar currentPage={currentPage} onPageChange={onPageChange} />
      <div className="main-container flex-1">
        <TopBar 
          currentPage={currentPage} 
          onRefresh={handleRefresh}
          refreshing={false}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default Layout;