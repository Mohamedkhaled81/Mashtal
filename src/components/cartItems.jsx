import { useDispatch, useSelector } from "react-redux";
import { selectAllItems, selectTotalPrice, updateQuantity, removeFromCart } from "../redux/cartSlice";
import { Stack, Typography, Card, CardMedia, Box, IconButton, Divider } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function CartItems() {
  const cartItems = useSelector(selectAllItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ color: "#57604b", fontWeight: "bold", mb: 2 }}>
        Your Plants ({cartItems.length})
      </Typography>

      {cartItems.map((item) => (

        <Card 
          key={item.id} 
          sx={{ 
            display: "flex", 
            p: 2, 
            borderRadius: "15px", 
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            alignItems: "center"
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 100, height: 100, borderRadius: "10px", objectFit: "cover" }}
            image={item.image}
            alt={item.name}
          />

          <Box sx={{ flex: 1, ml: 3 }}>
            <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Unit Price: EGP {item.price}
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mx: 4 }}>
            <IconButton 
              size="small" 
              onClick={() => dispatch(updateQuantity({ id: item.id, newQuantity: item.quantity - 1 }))}
              disabled={item.quantity <= 1 }
            >
              <RemoveIcon />
            </IconButton>
            
            <Typography fontWeight="bold">{item.quantity}</Typography>
            
            <IconButton 
              size="small" 
              onClick={() => dispatch(updateQuantity({ id: item.id, newQuantity: item.quantity + 1 }))}
              disabled={ item.quantity === item.stock }
            >
              <AddIcon /> 
            </IconButton>
          </Stack>

          <Box sx={{ minWidth: 100, textAlign: "right" }}>
            <Typography variant="h6" fontWeight="bold">
              EGP {(item.subTotal).toFixed(2)}
            </Typography>
            <IconButton 
              color="error" 
              onClick={() => dispatch(removeFromCart(item.id))}
              sx={{ mt: 1 }}
            >

              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        </Card>
      ))}

      <Divider sx={{ my: 4 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 1 }}>
        <Typography variant="h5" color="#57604b">Total</Typography>
        <Typography variant="h4" fontWeight="bold" color="#57604b">
          EGP {totalPrice.toFixed(2)}
        </Typography>
      </Box>
    </Stack>
  );
}