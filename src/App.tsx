// src/App.tsx - Added ProjectProvider
import { useState } from 'react';
import Layout from './components/Layout';
import { ProjectProvider } from './context/ProjectContext';
import './App.css';

export type PageType = 'overview' | 'instances' | 'cluster-nodes' | 'networks' | 'storage' | 'operations' | 'events' | 'metrics' | 'projects';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('overview');

  return (
    <ProjectProvider defaultProject="">
      <Layout currentPage={currentPage} onPageChange={setCurrentPage} />
    </ProjectProvider>
  );
}

export default App;