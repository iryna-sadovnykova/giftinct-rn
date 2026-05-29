import { useCallback, useEffect, useState } from 'react';
import { fetchGifteeById } from '../api/client';
import { Giftee } from '../types/giftee';

type UseGifteeResult = {
  giftee: Giftee | undefined;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export const useGiftee = (gifteeId: string): UseGifteeResult => {
  const [giftee, setGiftee] = useState<Giftee | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchGifteeById(gifteeId);
      setGiftee(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load giftee');
    } finally {
      setLoading(false);
    }
  }, [gifteeId]);

  useEffect(() => {
    load();
  }, [load]);

  return { giftee, loading, error, refetch: load };
};
