import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Dashboard from './Dashboard';

const Layout: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="main-container flex-1">
        <TopBar />
        <Dashboard />
      </div>
    </div>
  );
};

export default Layout;