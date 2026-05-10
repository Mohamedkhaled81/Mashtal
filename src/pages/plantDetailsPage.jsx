import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import { fetchPlant } from "../services/api";
import NotFoundPage from "./notFoundPage";
import LoadingPage from "./loadingPage";
import NumberField from "../components/numberField";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { updateQuantity } from "../redux/cartSlice";
import { useGetCartItem } from "../hooks/checkCartItem";

export default function PlantDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cartItem = useGetCartItem(id);
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);
  const dispatch = useDispatch();
  const plantPrice = plant?.price.toFixed(2);
  const newPrice = (plantPrice - (plant?.discount * plantPrice) / 100).toFixed(
    2,
  );

  useEffect(() => {
    const getPlant = async () => {
      try {
        const data = await fetchPlant(id);
        setPlant(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getPlant();
  }, [id]);

  if (loading) return <LoadingPage />;
  if (!plant) return <NotFoundPage />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/plants')}
        sx={{ mb: 4, color: "#57604b" }}
      >
        Back to Gallery
      </Button>
      <Stack direction="row" gap={5} flexWrap={"wrap"}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "450px",
            height: "630px",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.02)" },
          }}
        >
          <Box
            component="img"
            src={plant.image}
            alt={plant.name}
            sx={{
              width: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />

          {plant.discount !== 0 && (
            <Chip
              label={`-${plant.discount}%`}
              sx={{
                fontWeight: "bold",
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            />
          )}
        </Box>

        <Stack sx={{ flex: 2 }}>
          <Typography
            variant="overline"
            color="text.secondary"
            fontWeight="bold"
          >
            {plant.category || "Indoor Plant"}
          </Typography>

          <Typography
            variant="h3"
            sx={{ color: "#2d3436", fontWeight: 700, mb: 1 }}
          >
            {plant.name}
          </Typography>

          <Typography variant="h5">
            {plant.discount === 0 ? (
              `EGP ${plantPrice}`
            ) : (
              <Stack direction="row" spacing={1} component="span">
                <span style={{ textDecoration: "line-through", opacity: 0.6 }}>
                  EGP {plantPrice}
                </span>
                <span style={{ color: "#d32f2f" }}>EGP {newPrice}</span>
              </Stack>
            )}
          </Typography>

          <Typography
            variant="h6"
            color="#57604b"
            sx={{ mb: 3, fontWeight: 500 }}
          >
            stock: {plant.stock}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="body1"
            sx={{ color: "#636e72", lineHeight: 1.8, mb: 4 }}
          >
            {plant.description ||
              "Bring nature into your home with this beautiful, easy-to-care-for plant. Perfect for adding a touch of green to your living space or office."}
          </Typography>

          <Box flex={1} sx={{ display: "flex", gap: 2, mb: 4 }}>
            <Chip label="Easy Care" color="success" variant="outlined" />
            <Chip label="Low Light" color="success" variant="outlined" />
            <Chip label="Pet Friendly" color="success" variant="outlined" />
            {plant.characteristics.map((val) => (
              <Chip
                key={val}
                label={`${val}`}
                color="success"
                variant="outlined"
              />
            ))}
          </Box>
          <Stack direction="row"  sx={{ mt: 3, justifyContent: "space-between"}}>
            <NumberField
              value={quantity}
              onValueChange={(val) => {
                setQuantity(val);
              }}
              min={1}
              max={plant.stock}
            />
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              sx={{
                bgcolor: "#57604b",
                borderRadius: "12px",
                fontSize: "20px",
                px: "40px",
                "&:hover": { bgcolor: "#3d4534" },
              }}
              onClick={() =>
                cartItem
                  ? dispatch(updateQuantity({ id, newQuantity: quantity }))
                  : dispatch(addToCart({ ...plant, price: (plant.discount ? newPrice : plantPrice), quantity }))
              }
            >
              {(cartItem ? "update" : "add") + " cart"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
