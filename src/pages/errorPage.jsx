import { Stack, Container, Typography } from "@mui/material";

export default function ErrorPage() {
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
        <Typography variant="h1" fontWeight="bold" sx={{ color: "red" }}>
          &lt; Error /&gt;
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Oops! Something Went Wrong.
        </Typography>
      </Container>
    </Stack>
  );
}
