// src/api/ServiceFactory.ts
import { LXDApiClient } from './client/LXDApiClient';
import  { DashboardService,  } from './services/DashboardService';
import type { DashboardServiceConfig } from './services/DashboardService';
import type { ApiConfig } from './config';
import { defaultApiConfig } from './config';

export class ServiceFactory {
  private static instance: ServiceFactory;
  private apiClient: LXDApiClient;
  private dashboardService: DashboardService | null = null;

  private constructor(config: ApiConfig = defaultApiConfig) {
    this.apiClient = new LXDApiClient(config);
  }

  static getInstance(config?: ApiConfig): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory(config);
    }
    return ServiceFactory.instance;
  }

  getDashboardService(config?: DashboardServiceConfig): DashboardService {
    if (!this.dashboardService) {
      this.dashboardService = new DashboardService(this.apiClient, config);
    }
    return this.dashboardService;
  }



  getApiClient(): LXDApiClient {
    return this.apiClient;
  }

  async healthCheck(): Promise<boolean> {
    return this.apiClient.healthCheck();
  }

  // Method to reinitialize with new config
  static reinitialize(config: ApiConfig): ServiceFactory {
    ServiceFactory.instance = new ServiceFactory(config);
    return ServiceFactory.instance;
  }
}