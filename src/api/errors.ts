import { ApiError } from './client';

export const getApiErrorMessage = (err: unknown, resource: string): string => {
  if (err instanceof ApiError) {
    if (err.status != null) {
      return `Failed to load ${resource} (HTTP ${err.status})`;
    }
    return err.message;
  }

  if (err instanceof Error) {
    if (err.message === 'Network request failed') {
      return `Failed to load ${resource}. Check your network connection.`;
    }
    return err.message;
  }

  return `Failed to load ${resource}`;
};
