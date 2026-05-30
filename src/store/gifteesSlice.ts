import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchGiftees as fetchGifteesApi } from '../api/client';
import { getApiErrorMessage } from '../api/errors';
import { Giftee } from '../types/giftee';

type GifteesState = {
  items: Giftee[];
  loading: boolean;
  error: string | null;
};

type StateWithGiftees = {
  giftees: GifteesState;
};

const initialState: GifteesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchGiftees = createAsyncThunk<
  Giftee[],
  { force?: boolean } | void,
  { rejectValue: string; state: StateWithGiftees }
>(
  'giftees/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchGifteesApi();
    } catch (err) {
      return rejectWithValue(getApiErrorMessage(err, 'giftees'));
    }
  },
  {
    condition: (arg, { getState }) => {
      const force = arg && typeof arg === 'object' ? arg.force : false;
      if (force) {
        return true;
      }

      const { giftees } = getState();
      if (giftees.loading || giftees.items.length > 0) {
        return false;
      }

      return true;
    },
  },
);

const gifteesSlice = createSlice({
  name: 'giftees',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchGiftees.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGiftees.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGiftees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load giftees';
      });
  },
});

export const gifteesReducer = gifteesSlice.reducer;

export const selectAllGiftees = (state: StateWithGiftees) => state.giftees.items;
export const selectGifteesLoading = (state: StateWithGiftees) =>
  state.giftees.loading;
export const selectGifteesError = (state: StateWithGiftees) =>
  state.giftees.error;
export const selectGifteeById = (state: StateWithGiftees, id: string) =>
  state.giftees.items.find(giftee => giftee.id === id);
