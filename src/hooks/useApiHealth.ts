// src/hooks/useApiHealth.ts
import { useState, useEffect, useCallback } from 'react';
import { ServiceFactory } from '../api/ServiceFactory';

export interface UseApiHealthResult {
  isHealthy: boolean;
  checking: boolean;
  lastCheck: Date | null;
  checkHealth: () => Promise<void>;
}

export function useApiHealth(checkInterval = 60000): UseApiHealthResult {
  const [isHealthy, setIsHealthy] = useState(false);
  const [checking, setChecking] = useState(true);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const serviceFactory = ServiceFactory.getInstance();

  const checkHealth = useCallback(async () => {
    setChecking(true);
    try {
      const healthy = await serviceFactory.healthCheck();
      setIsHealthy(healthy);
      setLastCheck(new Date());
    } catch (error) {
      console.error('Health check failed:', error);
      setIsHealthy(false);
    } finally {
      setChecking(false);
    }
  }, [serviceFactory]);

  useEffect(() => {
    checkHealth();

    if (checkInterval > 0) {
      const interval = setInterval(checkHealth, checkInterval);
      return () => clearInterval(interval);
    }
  }, [checkHealth, checkInterval]);

  return {
    isHealthy,
    checking,
    lastCheck,
    checkHealth,
  };
}