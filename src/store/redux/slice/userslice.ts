import { createSlice } from '@reduxjs/toolkit';

interface User {
  name: string;
}

const initialState: User = {
  name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addName: (state, action) => {
      state.name = action.payload.name;
      console.log(state);
    },
    deleteName: () => {
      return initialState;
    },
  },
});

export const { addName, deleteName } = userSlice.actions;
export default userSlice.reducer;
