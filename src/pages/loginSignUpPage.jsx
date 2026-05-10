import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
  Stack,
  Container,
  Tab,
  Tabs,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import {
  signInWithGoogle,
  signUpWithEmail,
  loginWithEmail,
} from "../services/firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let user;
      if (isSignup) {
        user = await signUpWithEmail(
          formData.email,
          formData.password,
          formData.name,
        );
      } else {
        const res = await loginWithEmail(formData.email, formData.password);
        user = res.user;
      }

      dispatch(
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }),
      );
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  const handleGoogle = async () => {
    const res = await signInWithGoogle();
    if (res.user) {
      dispatch(
        setUser({
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email,
          photo: res.user.photoURL
        }),
      );
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          {isSignup ? "Create Account" : "Welcome Back"}
        </Typography>

        <Tabs
          value={isSignup ? 1 : 0}
          onChange={(e, val) => setIsSignup(!!val)}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        <form onSubmit={handleAuth}>
          <Stack spacing={2}>
            {isSignup && (
              <TextField
                label="Full Name"
                required
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            )}
            <TextField
              label="Email"
              type="email"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              label="Password"
              type="password"
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {error && (
              <Typography color="error" variant="caption">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ bgcolor: "#57604b", py: 1.5 }}
            >
              {isSignup ? "Sign Up" : "Login"}
            </Button>
          </Stack>
        </form>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogle}
          sx={{ color: "#57604b", borderColor: "#57604b" }}
        >
          Continue with Google
        </Button>
      </Paper>
    </Container>
  );
}
