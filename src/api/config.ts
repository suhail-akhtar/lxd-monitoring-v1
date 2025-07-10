/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/config.ts
// src/api/config.ts - Updated with environment variables
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  debugMode: boolean;
  mockData: boolean;
}
// export const defaultApiConfig: ApiConfig = {
//   baseUrl: 'https://172.21.200.18:8443',
//   timeout: 10000,
//   retryAttempts: 3,
//   retryDelay: 1000,
// };

const getEnvVar = (key: string, defaultValue: string): string => {
  return import.meta.env[key] || defaultValue;
};

const getEnvNumber = (key: string, defaultValue: number): number => {
  const value = import.meta.env[key];
  return value ? parseInt(value, 10) : defaultValue;
};

const getEnvBoolean = (key: string, defaultValue: boolean): boolean => {
  const value = import.meta.env[key];
  return value ? value.toLowerCase() === 'true' : defaultValue;
};

export const createApiConfig = (): ApiConfig => {
  const config: ApiConfig = {
    baseUrl: getEnvVar('REACT_APP_API_BASE_URL', 'http://localhost:3001/api/lxd'),
    timeout: getEnvNumber('REACT_APP_API_TIMEOUT', 10000),
    retryAttempts: getEnvNumber('REACT_APP_API_RETRY_ATTEMPTS', 3),
    retryDelay: getEnvNumber('REACT_APP_API_RETRY_DELAY', 1000),
    debugMode: getEnvBoolean('REACT_APP_DEBUG_MODE', false),
    mockData: getEnvBoolean('REACT_APP_MOCK_DATA', false),
  };

  if (config.debugMode) {
    console.log('API Configuration:', config);
  }

  return config;
};

export const defaultApiConfig: ApiConfig = createApiConfig();

// Development utilities
export const isDevelopment = (): boolean => {
  return import.meta.env.MODE === 'development';
};

export const isProduction = (): boolean => {
  return import.meta.env.MODE === 'production';
};
