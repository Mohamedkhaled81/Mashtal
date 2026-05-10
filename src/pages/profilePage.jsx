import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Avatar,
  Box,
  Button,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import { logoutUser } from "../services/firebase/firebase";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    navigate("/");
  };

  if (!user) return null;

  return (
    <Stack component="main">
      {console.log(user)}
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
          My Profile
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              src={user.photo}
              imgProps={{ referrerPolicy: "no-referrer" }}
              sx={{ width: 150, height: 150, border: "4px solid #768068" }}
            >
              {user.name?.charAt(0)}
            </Avatar>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#2e3328" }}
            >
              Happy Planting, {user.name.split(" ")[0]}!
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Welcome to your personal Mashtal dashboard.
            </Typography>

            <Stack spacing={2} sx={{ mt: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <BadgeIcon sx={{ color: "#768068" }} />
                <Typography variant="subtitle1">
                  <strong>Name:</strong> {user.name}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <EmailIcon sx={{ color: "#768068" }} />
                <Typography variant="subtitle1">
                  <strong>Email:</strong> {user.email}
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ mt: 6, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate("/plants")}
                sx={{ bgcolor: "#768068", borderRadius: "10px", px: 4 }}
              >
                Back to Plants
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{ borderRadius: "10px" }}
              >
                Logout
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />

        <Typography variant="h6" gutterBottom color="#768068">
          Order History
        </Typography>
        <Box
          sx={{
            p: 4,
            bgcolor: "#f9f9f9",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <Typography color="text.secondary">
            You haven't ordered any plants yet. Your garden is waiting!
          </Typography>
        </Box>
      </Container>
    </Stack>
  );
}
