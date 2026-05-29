import { Giftee } from '../types/giftee';
import { API_CONFIG } from './config';
import { mapApiGift, mapApiGiftee, MappedGift } from './mappers';
import { ApiGift, ApiGiftee } from './types';

export type { MappedGift } from './mappers';

class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new ApiError(
      `Request failed (${response.status})`,
      response.status,
    );
  }

  return response.json() as Promise<T>;
};

export const fetchGiftees = async (): Promise<Giftee[]> => {
  const data = await fetchJson<ApiGiftee[]>(API_CONFIG.gifteesUrl);
  return data.map(mapApiGiftee);
};

export const fetchGifteeById = async (id: string): Promise<Giftee | undefined> => {
  const giftees = await fetchGiftees();
  return giftees.find(giftee => giftee.id === id);
};

export const fetchGifts = async (): Promise<MappedGift[]> => {
  const data = await fetchJson<ApiGift[]>(API_CONFIG.giftsUrl);
  return data.map(mapApiGift);
};

export { ApiError };
