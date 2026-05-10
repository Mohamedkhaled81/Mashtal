import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Box, Container, Typography, Grid, Button } from "@mui/material";
import PlantCard from "../components/plantCard";
import LoadingPage from "./loadingPage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ErrorPage from "./errorPage";
import {
  selectAllPlants,
  selectPlantsStatus,
  getPlants,
} from "../redux/plantsSlice";
import { useNavigate } from "react-router";

export default function PlantsPage() {
  const dispatch = useDispatch();
  const plants = useSelector(selectAllPlants);
  const plantsStatus = useSelector(selectPlantsStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (plantsStatus === "idle") {
      dispatch(getPlants());
    }
  }, [dispatch, plantsStatus]);

  if (plantsStatus === "loading") {
    return <LoadingPage />;
  }

  if (plantsStatus === "failed") {
    return <ErrorPage />;
  }

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
          Our Plant Collection
        </Typography>
      </Box>
      <Container maxWidth="lg" sx={{ py: 4 }}>
              <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ mb: 4, color: "#57604b"}}
      >
        Back to Home
      </Button>
        <Grid container spacing={6} justifyContent="center" sx={{ py: 4 }}>
          {plants.map((plant) => (
            <Grid item key={plant.id} xs={12} sm={6} md={4} lg={3}>
              <PlantCard plant={plant} />
            </Grid>
          ))}
        </Grid>

        {plantsStatus === "succeeded" && plants.length === 0 && (
          <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
            No plants found in the garden yet.
          </Typography>
        )}
      </Container>
    </Stack>
  );
}
