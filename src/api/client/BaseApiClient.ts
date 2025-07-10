/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/client/BaseApiClient.ts
import type { ApiConfig } from '../config';
export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retryAttempts?: number;
}

export class ApiClientError extends Error {
  public statusCode?: number;
  public operation?: string;
  public originalError?: Error;

  constructor(
    message: string,
    statusCode?: number,
    operation?: string,
    originalError?: Error
  ) {
    super(message);
    this.name = 'ApiClientError';
    this.statusCode = statusCode;
    this.operation = operation;
    this.originalError = originalError;
  }
}

export abstract class BaseApiClient {
  protected config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  protected async makeRequest<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.config.timeout,
      retryAttempts = this.config.retryAttempts,
    } = options;

    const url = `${this.config.baseUrl}${endpoint}`;
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    // Add certificate authentication if available
    if (this.shouldAddClientCertificate()) {
      await this.addClientCertificate(requestOptions);
    }

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          ...requestOptions,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new ApiClientError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status
          );
        }

        const data = await response.json();
        return this.handleResponse<T>(data);
      } catch (error) {
        lastError = error as Error;

        // Don't retry on client errors (4xx) or last attempt
        if (
          error instanceof ApiClientError &&
          error.statusCode &&
          error.statusCode >= 400 &&
          error.statusCode < 500
        ) {
          break;
        }

        if (attempt === retryAttempts) {
          break;
        }

        // Wait before retrying
        await this.delay(this.config.retryDelay * Math.pow(2, attempt));
      }
    }

    throw lastError || new ApiClientError('Request failed after all retry attempts');
  }

  protected async makeRequestWithoutRetry<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    return this.makeRequest<T>(endpoint, { ...options, retryAttempts: 0 });
  }

  protected handleResponse<T>(data: any): T {
    // Override in subclasses for specific response handling
    return data as T;
  }

  protected shouldAddClientCertificate(): boolean {
    // Override in subclasses if client certificate authentication is needed
    return false;
  }

  protected async addClientCertificate(requestOptions: RequestInit): Promise<void> {
    // Override in subclasses to add client certificate
    // Note: In browser environment, client certificates are handled differently
    // This might require a proxy server or browser certificate store
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Utility methods
  protected buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  protected validateResponse(data: any): void {
    if (!data) {
      throw new ApiClientError('Empty response received');
    }
  }

  // Abstract methods to be implemented by subclasses
  abstract healthCheck(): Promise<boolean>;
}
