import { useState } from 'react';
import Layout from './components/Layout';
import './App.css';

export type PageType = 'overview' | 'instances' | 'cluster-nodes' | 'networks' | 'storage' | 'operations' | 'events' | 'metrics' | 'projects';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('overview');

  return <Layout currentPage={currentPage} onPageChange={setCurrentPage} />;
}


export default App;