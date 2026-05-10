import { useSelector } from "react-redux";
import { selectAllItems } from "../redux/cartSlice";

export function useGetCartItem(id) {
    const cartItems = useSelector(selectAllItems);
    return cartItems.find((item) => item.id === id);
}