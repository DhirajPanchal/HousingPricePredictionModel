import { createSlice } from "@reduxjs/toolkit";
import { Drug } from "../../../model/Drug";
import { fetchDrugCategories, fetchDrugClasses, fetchDrugList } from "./drugs-async-thunks";
import { ListItem, ListResponse } from "../../../model/list.model";

type DrugsSliceType = {
  listResponse: ListResponse<Drug>;
  isLoading: boolean;
  error: any;
  drugCategories: ListItem[];
  drugClasses: ListItem[];
};

const DrugsSliceInitialState: DrugsSliceType = {
  listResponse: { content: [], count: 0 },
  isLoading: false,
  error: null,
  drugCategories: [],
  drugClasses: [],
};

const drugsSlice = createSlice({
  name: "drugs",
  initialState: DrugsSliceInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDrugList.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDrugList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listResponse = action.payload;
    });
    builder.addCase(fetchDrugList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(fetchDrugCategories.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDrugCategories.fulfilled, (state, action) => {    
      state.isLoading = false;      
      state.drugCategories = action.payload;
    });
    builder.addCase(fetchDrugCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(fetchDrugClasses.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDrugClasses.fulfilled, (state, action) => {    
      state.isLoading = false;      
      state.drugClasses = action.payload;
    });
    builder.addCase(fetchDrugClasses.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });



  },
});

export default drugsSlice;
