import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllPlants } from "../services/api";

export const getPlants = createAsyncThunk("plants/getPlants", async () => {
  const data = await fetchAllPlants();
  return data;
});

const plantsSlice = createSlice({
  name: "plants",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlants.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPlants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getPlants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllPlants = (state) => state.plants.items;
export const selectPlantsStatus = (state) => state.plants.status;
export const selectPlantsError = (state) => state.plants.error;
export default plantsSlice.reducer;
