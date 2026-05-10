import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import { Stack, Chip } from "@mui/material";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router";

export default function PlantCard({ plant }) {
  const plantPrice = plant.price.toFixed(2);
  const newPrice = (plantPrice - (plant.discount * plantPrice) / 100).toFixed(
    2,
  );
  return (
    <Link style={{textDecoration: "none"}} to={`/plants/${plant.id}`}>
      <Paper elevation={10} sx={{ borderRadius: "10px" }}>
        <Card sx={{ width: "240px", borderRadius: "10px" }}>
          <CardActionArea>
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
            <CardMedia
              component="img"
              height="250"
              image={plant.image}
              alt={plant.name}
            />
            <CardContent>
              <Stack alignItems="center" spacing={1}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography gutterBottom variant="h6" component="div">
                    {plant.name}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {plant.discount === 0 ? (
                    `EGP ${plantPrice}`
                  ) : (
                    <Stack direction="row" spacing={1} component="span">
                      <span
                        style={{ textDecoration: "line-through", opacity: 0.6 }}
                      >
                        EGP {plantPrice}
                      </span>
                      <span style={{ color: "#d32f2f" }}>EGP {newPrice}</span>
                    </Stack>
                  )}
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>
    </Link>
  );
}
