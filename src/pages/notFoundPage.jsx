import { Stack, Container, Typography, Button } from "@mui/material";

export default function NotFoundPage() {
  return (
    <Stack 
      spacing={3} 
      sx={{ 
        alignItems: "center", 
        justifyContent: "center", 
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          p: "50px", 
          textAlign: "center",
        }}
      >
        <Typography variant="h1" fontWeight="bold" sx={{color: "red"}}>
          &lt; 404  /&gt;
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Oops! The page / Resource you're looking for doesn't exist.
        </Typography>
        <Button variant="contained" href="/" sx={{background: "#57604b"}}>
          Go Home
        </Button>
      </Container>
    </Stack>
  );
}