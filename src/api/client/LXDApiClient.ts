/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/client/LXDApiClient.ts - Updated to handle proxy and environment
import { BaseApiClient, ApiClientError } from './BaseApiClient';
import type { RequestOptions } from './BaseApiClient';
import type { ApiConfig } from '../config';
import { isDevelopment } from '../config';
import type { LXDResponse, LXDError } from '../types/common';

export class LXDApiClient extends BaseApiClient {
  constructor(config: ApiConfig) {
    super(config);
  }

  protected handleResponse<T>(data: any): T {
    this.validateResponse(data);

    if (this.config.debugMode) {
      console.log('API Response:', data);
    }

    // Handle LXD-specific response format
    if (this.isLXDResponse(data)) {
      const lxdResponse = data as LXDResponse<T>;
      
      if (lxdResponse.type === 'error') {
        throw new ApiClientError(
          lxdResponse.error || 'LXD API error',
          lxdResponse.error_code,
          lxdResponse.operation
        );
      }

      return lxdResponse.metadata;
    }

    return data as T;
  }

  protected shouldAddClientCertificate(): boolean {
    // In development with proxy, certificates are handled by the proxy server
    // In production, this would depend on your deployment setup
    return !isDevelopment();
  }

  protected async addClientCertificate(requestOptions: RequestInit): Promise<void> {
    if (isDevelopment()) {
      // In development, the proxy server handles certificates
      return;
    }

    // Production certificate handling would go here
    console.warn('Production client certificate authentication not implemented');
  }

  private isLXDResponse(data: any): data is LXDResponse {
    return data && typeof data === 'object' && 'type' in data && 'status' in data;
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.makeRequestWithoutRetry('/1.0');
      if (this.config.debugMode) {
        console.log('Health check successful:', response);
      }
      return true;
    } catch (error) {
      if (this.config.debugMode) {
        console.error('LXD API health check failed:', error);
      }
      return false;
    }
  }

  // Override makeRequest to add debugging
  public async makeRequest<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    if (this.config.debugMode) {
      console.log(`API Request: ${options.method || 'GET'} ${this.config.baseUrl}${endpoint}`);
    }

    try {
      const result = await super.makeRequest<T>(endpoint, options);
      if (this.config.debugMode) {
        console.log(`API Success: ${endpoint}`, result);
      }
      return result;
    } catch (error) {
      if (this.config.debugMode) {
        console.error(`API Error: ${endpoint}`, error);
      }
      throw error;
    }
  }

  // LXD-specific API methods remain the same...
  async getApiVersion(): Promise<any> {
    return this.makeRequest('/1.0');
  }

  async getInstances(project?: string): Promise<any> {
    const params = project ? { project } : {};
    const queryString = this.buildQueryString(params);
    return this.makeRequest(`/1.0/instances${queryString}`);
  }

  async getInstanceInfo(name: string, project?: string): Promise<any> {
    const params = project ? { project } : {};
    const queryString = this.buildQueryString(params);
    return this.makeRequest(`/1.0/instances/${name}${queryString}`);
  }

  async getInstanceState(name: string, project?: string): Promise<any> {
    const params = project ? { project } : {};
    const queryString = this.buildQueryString(params);
    return this.makeRequest(`/1.0/instances/${name}/state${queryString}`);
  }

  async getClusterMembers(): Promise<any> {
    return this.makeRequest('/1.0/cluster/members');
  }

  async getClusterMemberInfo(name: string): Promise<any> {
    return this.makeRequest(`/1.0/cluster/members/${name}`);
  }

  async getStoragePools(): Promise<any> {
    return this.makeRequest('/1.0/storage-pools');
  }

  async getStoragePoolInfo(name: string): Promise<any> {
    return this.makeRequest(`/1.0/storage-pools/${name}`);
  }

  async getStoragePoolResources(name: string): Promise<any> {
    return this.makeRequest(`/1.0/storage-pools/${name}/resources`);
  }

  async getNetworks(): Promise<any> {
    return this.makeRequest('/1.0/networks');
  }

  async getNetworkInfo(name: string): Promise<any> {
    return this.makeRequest(`/1.0/networks/${name}`);
  }

  async getNetworkState(name: string): Promise<any> {
    return this.makeRequest(`/1.0/networks/${name}/state`);
  }

  async getOperations(): Promise<any> {
    return this.makeRequest('/1.0/operations');
  }

  async getOperationInfo(id: string): Promise<any> {
    return this.makeRequest(`/1.0/operations/${id}`);
  }

  async getEvents(): Promise<any> {
    return this.makeRequest('/1.0/events');
  }

  async getProjects(): Promise<any> {
    return this.makeRequest('/1.0/projects');
  }

  async getProjectInfo(name: string): Promise<any> {
    return this.makeRequest(`/1.0/projects/${name}`);
  }
}