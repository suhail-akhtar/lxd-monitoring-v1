/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/DebugPanel.tsx - LXD API Debug Helper
import React, { useState } from 'react';
import { ServiceFactory } from '../api/ServiceFactory';

const DebugPanel: React.FC = () => {
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState<string | null>(null);

  const testEndpoint = async (name: string, testFn: () => Promise<any>) => {
    setLoading(name);
    try {
      const result = await testFn();
      setResults(prev => ({ ...prev, [name]: { success: true, data: result } }));
    } catch (error) {
      setResults(prev => ({ 
        ...prev, 
        [name]: { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        } 
      }));
    } finally {
      setLoading(null);
    }
  };

  const runTests = async () => {
    const serviceFactory = ServiceFactory.getInstance();
    const apiClient = serviceFactory.getApiClient();

    // Test basic connectivity
    await testEndpoint('Health Check', () => apiClient.healthCheck());
    
    // Test API version
    await testEndpoint('API Version', () => apiClient.getApiVersion());
    
    // Test projects
    await testEndpoint('Projects', () => apiClient.getProjects());
    
    // Test instances
    await testEndpoint('Instances', () => apiClient.getInstances());
    
    // Test networks
    await testEndpoint('Networks', () => apiClient.getNetworks());
    
    // Test cluster members
    await testEndpoint('Cluster Members', () => apiClient.getClusterMembers());
    
    // Test storage pools
    await testEndpoint('Storage Pools', () => apiClient.getStoragePools());
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: '#161b22', 
      border: '1px solid #30363d',
      borderRadius: '8px',
      padding: '1rem',
      zIndex: 9999,
      maxWidth: '400px',
      maxHeight: '80vh',
      overflow: 'auto'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#e6edf3' }}>LXD API Debug</h3>
      
      <button 
        onClick={runTests}
        disabled={loading !== null}
        style={{
          background: '#1f6feb',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}
      >
        {loading ? `Testing ${loading}...` : 'Run All Tests'}
      </button>

      <div style={{ fontSize: '0.875rem' }}>
        {Object.entries(results).map(([name, result]: [string, any]) => (
          <div key={name} style={{ marginBottom: '0.5rem' }}>
            <strong style={{ color: result.success ? '#3fb950' : '#f85149' }}>
              {name}: {result.success ? '✅' : '❌'}
            </strong>
            {!result.success && (
              <div style={{ color: '#f85149', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {result.error}
              </div>
            )}
            {result.success && (
              <div style={{ color: '#8b949e', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {typeof result.data === 'object' 
                  ? `${Array.isArray(result.data) ? result.data.length : Object.keys(result.data).length} items`
                  : String(result.data)
                }
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebugPanel;