import { configureStore } from '@reduxjs/toolkit'
import plantsReducer from './redux/plantsSlice'
import CartReducer from './redux/cartSlice'
import userReducer from './redux/userSlice'
import OrderReducer from './redux/orderSlice'

export default configureStore({
  reducer: {
    plants: plantsReducer,
    cart: CartReducer,
    user: userReducer,
    orders: OrderReducer
  }
})