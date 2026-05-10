import { CircularProgress, Stack, Container, Typography } from "@mui/material"

export default function LoadingPage() {
  return (
    <Stack
      spacing={3}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%"
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          p: "50px",
          textAlign: "center",
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            mb: 3, 
            fontWeight: 500, 
            color: "text.secondary" 
          }}
        >
          Loading plants from the garden...
        </Typography>
        
        <CircularProgress color="success" size="4rem" />
      </Container>
    </Stack>
  )
}