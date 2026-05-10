import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserOrders, createOrder } from "../services/api";

export const fetchUserOrdersThunk = createAsyncThunk(
  "orders/fetchAll",
  async (userId) => {
    try {
      const data = await fetchUserOrders(userId);
      return data; 
    } catch (error) {
      return error.response;
    }
  }
);


export const createOrderThunk = createAsyncThunk(
  "orders/create",
  async (orderData) => {
    try {
      const data = await createOrder(orderData);
      return data; 
    } catch (error) {
      return error.response;
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    loading: false,        
    createLoading: false,  
    error: null,
  },
  reducers: {
    clearOrders: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* --- Create Order Cases --- */
      .addCase(createOrderThunk.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.createLoading = false;
        state.items.unshift(action.payload); 
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;