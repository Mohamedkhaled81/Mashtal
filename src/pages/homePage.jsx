import { Container, Typography, Stack } from "@mui/material";
import Slides from "../components/slides";
import PlantCard from "../components/plantCard";
export default function HomePage() {
  return (
    <Stack spacing={3} sx={{ alignItems: "center" }}>
      <Slides></Slides>
            <Container maxWidth="xl" sx={{ paddingY: "20px", borderRadius: "10px"}}>
        <Stack spacing={6} alignItems="center">
          <Typography
            sx={{
              color: "#57604b",
              textDecoration: "underline",
              textDecorationThickness: "3px",
              textUnderlineOffset: "15px"
            }}
            variant="h4"
          >
            GRAP YOURSELF A DEAL
          </Typography>
          <Stack sx={{flexWrap: "wrap", flexDirection: "row", justifyContent:"center", gap: "40px"}}>
            <PlantCard img={"/prod4.jpeg"}></PlantCard>
            <PlantCard img={"/prod3.jpeg"}></PlantCard>
            <PlantCard img={"/prod4.jpeg"}></PlantCard>
            <PlantCard img={"/prod2.jpeg"}></PlantCard>
          </Stack>
        </Stack>
      </Container>
      <Container maxWidth="xl" sx={{background: "white", paddingY: "20px", borderRadius: "10px"}}>
        <Stack spacing={3}>
          <Typography
            sx={{
              color: "#57604b",
              textDecoration: "underline",
              textDecorationThickness: "3px",
              textUnderlineOffset: "15px"
            }}
            variant="h4"
          >
            Newest Arrivals
          </Typography>
          <Stack sx={{flexWrap: "wrap", flexDirection: "row", justifyContent:"space-evenly", gap: "30px"}}>
            <PlantCard img={"/prod4.jpeg"}></PlantCard>
            <PlantCard img={"/prod3.jpeg"}></PlantCard>
            <PlantCard img={"/prod4.jpeg"}></PlantCard>
            <PlantCard img={"/prod2.jpeg"}></PlantCard>
          </Stack>
        </Stack>
      </Container>

    </Stack>
  );
}
