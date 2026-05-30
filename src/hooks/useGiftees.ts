import { useCallback, useEffect } from 'react';
import {
  fetchGiftees,
  selectAllGiftees,
  selectGifteeById,
  selectGifteesError,
  selectGifteesLoading,
} from '../store/gifteesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

/** Loads the giftee catalog from Redux (shared across Home, Giftees, Detail). */
export const useGiftees = () => {
  const dispatch = useAppDispatch();
  const giftees = useAppSelector(selectAllGiftees);
  const loading = useAppSelector(selectGifteesLoading);
  const error = useAppSelector(selectGifteesError);

  useEffect(() => {
    dispatch(fetchGiftees());
  }, [dispatch]);

  const refetch = useCallback(() => {
    dispatch(fetchGiftees({ force: true }));
  }, [dispatch]);

  return { giftees, loading, error, refetch };
};

/** Selects one giftee from the Redux catalog by id. */
export const useGiftee = (gifteeId: string) => {
  const dispatch = useAppDispatch();
  const giftee = useAppSelector(state => selectGifteeById(state, gifteeId));
  const loading = useAppSelector(selectGifteesLoading);
  const error = useAppSelector(selectGifteesError);

  useEffect(() => {
    dispatch(fetchGiftees());
  }, [dispatch]);

  const refetch = useCallback(() => {
    dispatch(fetchGiftees({ force: true }));
  }, [dispatch]);

  return { giftee, loading, error, refetch };
};
