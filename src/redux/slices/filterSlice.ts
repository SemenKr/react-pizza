import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FilterSlice {
  categoryId: number;
  sort: {
    name: string;
    sortProperty: string;
  };
}

const initialState: FilterSlice = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      console.log(action);
      state.categoryId = action.payload;
    },
  },
});

export const { setCategoryId } = filterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFilter = (state: RootState) => state.filter.categoryId;

export default filterSlice.reducer;
