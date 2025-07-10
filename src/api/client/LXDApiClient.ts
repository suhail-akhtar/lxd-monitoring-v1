/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/client/LXDApiClient.ts - Auto-inject current project into all API calls
import { BaseApiClient, ApiClientError } from './BaseApiClient';
import type { RequestOptions } from './BaseApiClient';
import type { ApiConfig } from '../config';
import { isDevelopment } from '../config';
import type { LXDResponse, LXDError } from '../types/common';

export class LXDApiClient extends BaseApiClient {
  private currentProject: string = '';

  constructor(config: ApiConfig) {
    super(config);
  }

  // Method to set the current project for all API calls
  setCurrentProject(project: string) {
    console.log(`🔄 LXDApiClient: Setting current project to "${project}"`);
    this.currentProject = project;
  }

  // Helper to add project parameter to endpoints that support it
  private addProjectParam(endpoint: string, forceProject?: string): string {
    const project = forceProject || this.currentProject;
    
    // Don't add project param to these endpoints
    const noProjectEndpoints = [
      '/1.0',
      '/1.0/cluster',
      '/1.0/projects',
      '/1.0/resources'
    ];

    // Check if endpoint should not have project param
    const shouldSkipProject = noProjectEndpoints.some(skip => 
      endpoint === skip || endpoint.startsWith(skip + '/')
    );

    if (shouldSkipProject || !project) {
      return endpoint;
    }

    // Add project parameter
    const separator = endpoint.includes('?') ? '&' : '?';
    return `${endpoint}${separator}project=${encodeURIComponent(project)}`;
  }

  // Override makeRequest to auto-inject project
  public async makeRequest<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    // Auto-inject current project for supported endpoints
    const endpointWithProject = this.addProjectParam(endpoint);
    
    if (this.config.debugMode && endpointWithProject !== endpoint) {
      console.log(`🔄 LXDApiClient: Added project param: ${endpoint} → ${endpointWithProject}`);
    }

    return super.makeRequest<T>(endpointWithProject, options);
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
    return !isDevelopment();
  }

  protected async addClientCertificate(requestOptions: RequestInit): Promise<void> {
    if (isDevelopment()) {
      return;
    }
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

  // LXD API methods - project will be auto-injected
  async getApiVersion(): Promise<any> {
    return this.makeRequest('/1.0');
  }

  async getInstances(project?: string): Promise<any> {
    const endpoint = project ? this.addProjectParam('/1.0/instances', project) : '/1.0/instances';
    return this.makeRequest(endpoint);
  }

  async getInstanceInfo(name: string, project?: string): Promise<any> {
    const endpoint = project ? this.addProjectParam(`/1.0/instances/${name}`, project) : `/1.0/instances/${name}`;
    return this.makeRequest(endpoint);
  }

  async getInstanceState(name: string, project?: string): Promise<any> {
    const endpoint = project ? this.addProjectParam(`/1.0/instances/${name}/state`, project) : `/1.0/instances/${name}/state`;
    return this.makeRequest(endpoint);
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