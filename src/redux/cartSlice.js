import { createSlice } from "@reduxjs/toolkit";
import { saveCart, loadCart } from "../utilties/localCartUtil";

const persistedState = loadCart();

const initialState = persistedState ?? {
  items: [], // {id, name, image, price, quantity, computed< Subtotal >}
  totalPrice: 0, // Total cost of all items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const plant = action.payload;
      const existingPlant = state.items.find((item) => item.id === plant.id);

      if (existingPlant) {
        return;
      }

      state.items.push({
        ...plant,
        subTotal: plant.quantity * plant.price,
      });

      state.totalAmount = state.items.length;
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.subTotal,
        0,
      );
      saveCart(state);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingPlant = state.items.find((item) => item.id === id);

      if (!existingPlant) {
        return;
      }

      state.items = state.items.filter((item) => item.id !== id);

      state.totalAmount -= 1;
      state.totalPrice -= existingPlant.subTotal;
      saveCart(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
      saveCart(state);
    },

    updateQuantity: (state, action) => {
      const { id, newQuantity } = action.payload;
      const existingPlant = state.items.find((item) => item.id === id);
      if (!existingPlant) {
        return;
      }
      existingPlant.quantity = newQuantity;
      existingPlant.subTotal = existingPlant.price * newQuantity;
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.subTotal,
        0,
      );
      saveCart(state);
    },
  },
});


export const selectAllItems = (state) => state.cart.items;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectTotalPrice = (state) => state.cart.totalPrice;
export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
