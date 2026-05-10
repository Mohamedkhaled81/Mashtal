import { Stack, Box, Typography, Container, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectAllItems } from "../redux/cartSlice";
import CartItems from "../components/cartItems";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Payment from "../components/paymentSection";

export default function CartPage() {
  const navigate = useNavigate();
  const cartItems = useSelector(selectAllItems);

  return (
    <Stack component="main">
      <Box
        component="header"
        sx={{ bgcolor: "white", width: "100%", textAlign: "center", py: 8 }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#57604b",
            textDecorationThickness: "3px",
            textUnderlineOffset: "15px",
          }}
        >
          My Plant's Cart
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {!cartItems.length ? (
          <Stack sx={{ alignItems: "center" }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              No plants are added to your cart yet..
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                navigate(-1);
              }}
              sx={{ background: "#57604b" }}
            >
              Go Back
            </Button>
          </Stack>
        ) : (
          <Stack>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/plants")}
              sx={{ mb: 4, color: "#57604b", alignSelf: "flex-start" }}
            >
              Back to Gallery
            </Button>
            <Stack direction="row" gap={5} justifyContent="space-around" flexWrap="wrap">
              <CartItems />
              <Payment/>
            </Stack>
          </Stack>
        )}
      </Container>
    </Stack>
  );
}
