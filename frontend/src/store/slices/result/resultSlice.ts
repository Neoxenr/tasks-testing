import { createSlice } from '@reduxjs/toolkit';

type State = {
  json: any;
};

const initialState: State = {
  json: {},
};

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setResult: (state, action) => {
      state.json = action.payload;
    },
  },
});

export const { setResult } = resultSlice.actions;

export default resultSlice.reducer;
