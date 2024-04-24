import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FilterSortType {
  name: string;
  sortProperty: string;
}

interface FilterSlice {
  categoryId: number;
  sortDirectionDesc: boolean;
  sort: FilterSortType;
}

const initialState: FilterSlice = {
  categoryId: 0,
  sortDirectionDesc: true,
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
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<FilterSortType>) {
      state.sort = action.payload;
    },
    changeSortDirection(state, action: PayloadAction<boolean>) {
      state.sortDirectionDesc = !action.payload;
    },
  },
});

export const { setCategoryId, setSortType, changeSortDirection } =
  filterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFilter = (state: RootState) => state.filter.categoryId;
export const selectSortType = (state: RootState) => state.filter.sort;
export const selectSortDirection = (state: RootState) =>
  state.filter.sortDirectionDesc;

export default filterSlice.reducer;
