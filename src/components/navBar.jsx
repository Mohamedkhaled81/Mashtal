import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const pages = ['PLANTS', 'GUIDES', 'GIFTS','CONTACT', 'ABOUT'];
const settings = ['Profile', 'Sign-Up/Login', 'Logout'];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const imgRef = React.useRef(null);
  const navRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const rect = navRef.current.getBoundingClientRect();
      if(rect.top <= 0) {
        imgRef.current.classList.add("fadeIn");
      }else{
        imgRef.current.classList.remove("fadeIn");
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <AppBar ref={navRef}  sx={{background: '#768068', position: "sticky", top: 0, zIndex: 1000}}>
      <Container maxWidth="xl" sx={{px: { xs: 2, sm: 4, md: 8 }}}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: { xs: 'none', md: 'flex'}}}>
            <img ref={imgRef} className='Logo' src='https://www.mashtalegypt.com/wp-content/themes/mashtal/img/logo-white.png?h=NfXYSuTFsLJKHNgaAtdF/' style={{width: '150px', display:'block'}}></img>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography fontWeight={'bold'} sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', fontSize: '20px' }}
              >
                {page}
              </Button>
            ))}
          </Box>
         <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <IconButton>

                <ShoppingCartIcon sx={{ color: "white" }} />
            </IconButton>

  <Tooltip title="Open settings">
    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
      <Avatar />
    </IconButton>
  </Tooltip>

  <Menu
    sx={{ mt: "45px" }}
    anchorEl={anchorElUser}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    open={Boolean(anchorElUser)}
    onClose={handleCloseUserMenu}
  >
    {settings.map((setting) => (
      <MenuItem key={setting} onClick={handleCloseUserMenu}>
        <Typography sx={{ textAlign: "center" }}>
          {setting}
        </Typography>
      </MenuItem>
    ))}
  </Menu>
</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
