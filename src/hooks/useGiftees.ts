import { useCallback, useEffect, useState } from 'react';
import { fetchGiftees } from '../api/client';
import { getApiErrorMessage } from '../api/errors';
import { Giftee } from '../types/giftee';

type UseGifteesResult = {
  giftees: Giftee[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export const useGiftees = (): UseGifteesResult => {
  const [giftees, setGiftees] = useState<Giftee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchGiftees();
      setGiftees(data);
    } catch (err) {
      setError(getApiErrorMessage(err, 'giftees'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { giftees, loading, error, refetch: load };
};
