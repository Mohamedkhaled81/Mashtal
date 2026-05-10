import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink, useNavigate } from "react-router";
import { Link as MuiLink } from "@mui/material";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalAmount } from "../redux/cartSlice";
import { logout } from "../redux/userSlice";
import { logoutUser } from "../services/firebase/firebase";

const pages = ["PLANTS", "GUIDES", "GIFTS", "CONTACT", "ABOUT"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const cartCount = useSelector(selectTotalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imgRef = React.useRef(null);
  const navRef = React.useRef(null);

  

  React.useEffect(() => {
    const handleScroll = () => {
      const rect = navRef.current.getBoundingClientRect();
      if (rect.top <= 0) {
        imgRef.current.classList.add("fadeIn");
      } else {
        imgRef.current.classList.remove("fadeIn");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = async (setting) => {
    handleCloseUserMenu();

    if (setting === "Logout") {
      try {
        await logoutUser(); 
        dispatch(logout()); 
        navigate("/");
      } catch (error) {
        console.error("Logout failed", error);
      }
    } else if (setting === "Sign-Up/Login") {
      navigate("/login-signUp");
    } else if (setting === "Profile") {
      navigate("/profile");
    }
  };

  return (
    <AppBar
      ref={navRef}
      sx={{
        background: "#768068",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        p: "5px",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4, md: 8 } }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <RouterLink to={"/"}>
              <img
                ref={imgRef}
                className="Logo"
                src="https://www.mashtalegypt.com/wp-content/themes/mashtal/img/logo-white.png?h=NfXYSuTFsLJKHNgaAtdF/"
                style={{ width: "150px", display: "block" }}
              ></img>
            </RouterLink>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography fontWeight={"bold"} sx={{ textAlign: "center" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {pages.map((page) => (
              <MuiLink
                component={RouterLink}
                to={`/${page.toLowerCase()}`}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: "bold",
                  fontSize: "20px",
                  textDecoration: "none",
                  "&:hover": { color: "#d4dbd5" },
                }}
              >
                {page}
              </MuiLink>
            ))}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <IconButton component={RouterLink} to="/plants/cart">
              <Badge badgeContent={cartCount} color="warning">
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar imgProps={{ referrerPolicy: "no-referrer" }} src={user?.photo} alt={user?.name} sx={{border: "2px solid #d4dbd5"}}>
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "10px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!isAuthenticated ? (
                <MenuItem onClick={() => handleSettingClick("Sign-Up/Login")}>
                  <Typography>Login / Sign Up</Typography>
                </MenuItem>
              ) : (
                [
                  <MenuItem
                    key="profile"
                    onClick={() => handleSettingClick("Profile")}
                  >
                    <Typography>Profile</Typography>
                  </MenuItem>,
                  <MenuItem
                    key="logout"
                    onClick={() => handleSettingClick("Logout")}
                  >
                    <Typography color="error">Logout</Typography>
                  </MenuItem>,
                ]
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
