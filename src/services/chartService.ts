/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/chartService.ts

const API_BASE = '/api/lxd';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  project?: string;
}

class ChartService {
  private async fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      return {
        success: false,
        data: {} as T,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Instance Status Chart Data
  async getInstanceStatus(project: string = 'all'): Promise<ApiResponse<any>> {
    const endpoint = project === 'all' 
      ? '/charts/instance-status'
      : `/charts/instance-status/${project}`;
    
    return this.fetchApi(endpoint);
  }

  // Resource Trends Chart Data
  async getResourceTrends(project: string = 'all'): Promise<ApiResponse<any>> {
    const endpoint = project === 'all' 
      ? '/charts/resource-trends'
      : `/charts/resource-trends/${project}`;
    
    return this.fetchApi(endpoint);
  }

  // Performance Chart Data
  async getPerformanceData(project: string = 'all'): Promise<ApiResponse<any>> {
    const endpoint = project === 'all' 
      ? '/charts/performance'
      : `/charts/performance/${project}`;
    
    return this.fetchApi(endpoint);
  }

  // Real-time metrics
  async getRealTimeMetrics(project: string = 'all'): Promise<ApiResponse<any>> {
    const endpoint = project === 'all' 
      ? '/charts/realtime'
      : `/charts/realtime/${project}`;
    
    return this.fetchApi(endpoint);
  }

  // Get available projects
  async getProjects(): Promise<ApiResponse<any[]>> {
    return this.fetchApi('/projects');
  }

  // Health check
  async checkHealth(): Promise<ApiResponse<any>> {
    return this.fetchApi('/health');
  }
}

export const chartService = new ChartService();
export default chartService;