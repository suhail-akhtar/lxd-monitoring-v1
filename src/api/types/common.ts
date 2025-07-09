/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/types/common.ts
export interface LXDResponse<T = any> {
  type: 'sync' | 'async' | 'error';
  status: string;
  status_code: number;
  operation?: string;
  error_code?: number;
  error?: string;
  metadata: T;
}

export interface LXDError {
  code: number;
  message: string;
  operation?: string;
}