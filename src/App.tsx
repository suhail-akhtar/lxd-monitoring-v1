<<<<<<< HEAD
// src/App.tsx - Added ProjectProvider
=======
>>>>>>> 018028a (all pages completed - working fine with mockup data)
import { useState } from 'react';
import Layout from './components/Layout';
import { ProjectProvider } from './context/ProjectContext';
import './App.css';

export type PageType = 'overview' | 'instances' | 'cluster-nodes' | 'networks' | 'storage' | 'operations' | 'events' | 'metrics' | 'projects';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('overview');

<<<<<<< HEAD
  return (
    <ProjectProvider defaultProject="">
      <Layout currentPage={currentPage} onPageChange={setCurrentPage} />
    </ProjectProvider>
  );
=======
  return <Layout currentPage={currentPage} onPageChange={setCurrentPage} />;
>>>>>>> 018028a (all pages completed - working fine with mockup data)
}

export default App;