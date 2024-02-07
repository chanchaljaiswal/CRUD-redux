// editingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const editingSlice = createSlice({
  name: "editing",
  initialState,
  reducers: {
    setEditRow: (state, action) => action.payload,
    clearEditRow: () => null,
  },
});

export const { setEditRow, clearEditRow } = editingSlice.actions;
export default editingSlice.reducer;
