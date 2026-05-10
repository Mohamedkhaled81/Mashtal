import Slides from "../components/slides";
import PlantCard from "../components/plantCard";
import { getPlants } from "../redux/plantsSlice";
import { Container, Typography, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPlants, selectPlantsStatus } from "../redux/plantsSlice";
import { useEffect } from "react";
import ErrorPage from "./errorPage";
import LoadingPage from "./loadingPage";

export default function HomePage() {
  const dispatch = useDispatch();
  const plants = useSelector(selectAllPlants);
  const plantsStatus = useSelector(selectPlantsStatus);

  useEffect(() => {
    if (plantsStatus === "idle") {
      dispatch(getPlants());
    }
  }, [dispatch, plantsStatus]);

  const discountedPlants = plants.filter((p) => p.discount !== 0).slice(0, 4);
  const newestPlants = [...plants]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  if (plantsStatus === "loading") return <LoadingPage />;
  if (plantsStatus === "failed") return <ErrorPage />;

  return (
    <Stack spacing={3} sx={{ alignItems: "center" }}>
      <Slides />

      <Container maxWidth="xl" sx={{ p: "20px", borderRadius: "10px" }}>
        <Stack spacing={6} alignItems="center">
          <Typography
            sx={{
              color: "#57604b",
              textDecorationThickness: "3px",
              textUnderlineOffset: "15px",
            }}
            variant="h4"
          >
            GRAB YOURSELF A DEAL
          </Typography>
          <Stack
            sx={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
              gap: "40px",
            }}
          >
            {discountedPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
            {plantsStatus === "succeeded" && plants.length === 0 && (
              <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
                No plants found in the garden yet.
              </Typography>
            )}
          </Stack>
        </Stack>
      </Container>

      <Container
        maxWidth="xl"
        sx={{ background: "white", py: "40px", borderRadius: "10px" }}
      >
        <Stack spacing={6}>
          <Typography
            sx={{
              color: "#57604b",
              textDecorationThickness: "3px",
              textUnderlineOffset: "15px",
              alignSelf: "center",
            }}
            variant="h4"
          >
            NEWEST ARRIVALS
          </Typography>
          <Stack
            sx={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-around",
              gap: "40px",
            }}
          >
            {newestPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
            {plantsStatus === "succeeded" && plants.length === 0 && (
              <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
                No plants found in the garden yet.
              </Typography>
            )}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
