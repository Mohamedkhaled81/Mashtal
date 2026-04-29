import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import { Stack, Chip } from "@mui/material";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function PlantCard({ img }) {
  return (
    <Paper elevation={10}>
      <Card sx={{ width: "240px"}}>
        <CardActionArea>
          <Chip label="-20%" sx={{fontWeight: "bold", position: "absolute", top:"10px", right:"10px"}} />  
          <CardMedia
            component="img"
            height="250"
            image={img}
            alt="green iguana"
          />
          <CardContent>
            <Stack alignItems="center" spacing={1}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography gutterBottom variant="h5" component="div">
                    Bougainvillea
                    </Typography>
                    
                </Stack>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    EGP 240.00
                </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Paper>
  );
}
