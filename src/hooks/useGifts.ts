import { useCallback, useEffect, useState } from 'react';
import { fetchGifts } from '../api/client';
import { MappedGift } from '../api/mappers';

type UseGiftsResult = {
  gifts: MappedGift[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export const useGifts = (): UseGiftsResult => {
  const [gifts, setGifts] = useState<MappedGift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchGifts();
      setGifts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load gifts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { gifts, loading, error, refetch: load };
};
