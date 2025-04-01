import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visitedPages: ['Home'], 
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addPage: (state, action) => {
      if (!state.visitedPages.includes(action.payload)) {
        state.visitedPages.push(action.payload);
      }
    },
  },
});

export const { addPage } = menuSlice.actions;
export default menuSlice.reducer;