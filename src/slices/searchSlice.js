import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchWord: null,
  recommendWordIndex: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    SET_SEARCH_WORD(state, action) {
      state.searchWord = action.payload;
    },
    OPERATION_RECOMMEND_WORD_INDEX(state, action) {
      if (action.payload === 'ArrowDown') state.recommendWordIndex += 1;
      else if (action.payload === 'ArrowUp') state.recommendWordIndex -= 1;
      else state.recommendWordIndex = action.payload;
    },
  },
});

export const { SET_SEARCH_WORD, OPERATION_RECOMMEND_WORD_INDEX } = searchSlice.actions;

export default searchSlice.reducer;
