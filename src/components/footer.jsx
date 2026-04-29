import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  IconButton, 
  Link, 
  Stack,
  Divider 
} from '@mui/material';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Pinterest,
  Email,
  Phone,
  LocationOn 
} from '@mui/icons-material';

const Footer = () => {
  const footerColor = '#57604b';
  const lightBg = '#f5f7f2';

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: lightBg,
        pt: 8,
        pb: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                color: footerColor,
                fontWeight: 600,
                mb: 2,
              }}
            >
              Green Haven
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                mb: 2,
                lineHeight: 1.8,
              }}
            >
              Bringing nature into your home with carefully curated plants and expert care guidance.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                sx={{ 
                  color: footerColor,
                  '&:hover': { backgroundColor: footerColor, color: 'white' }
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                size="small"
                sx={{ 
                  color: footerColor,
                  '&:hover': { backgroundColor: footerColor, color: 'white' }
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                size="small"
                sx={{ 
                  color: footerColor,
                  '&:hover': { backgroundColor: footerColor, color: 'white' }
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                size="small"
                sx={{ 
                  color: footerColor,
                  '&:hover': { backgroundColor: footerColor, color: 'white' }
                }}
              >
                <Pinterest />
              </IconButton>
            </Stack>
          </Grid>


          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                color: footerColor,
                fontWeight: 600,
                mb: 2,
              }}
            >
              Shop
            </Typography>
            <Stack spacing={1}>
              {['New Arrivals', 'Indoor Plants', 'Outdoor Plants', 'Succulents', 'Plant Care'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  underline="none"
                  sx={{
                    color: '#666',
                    fontSize: '0.875rem',
                    '&:hover': { color: footerColor },
                    transition: 'color 0.3s',
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                color: footerColor,
                fontWeight: 600,
                mb: 2,
              }}
            >
              Help
            </Typography>
            <Stack spacing={1}>
              {['About Us', 'Contact', 'Shipping', 'Returns', 'FAQ'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  underline="none"
                  sx={{
                    color: '#666',
                    fontSize: '0.875rem',
                    '&:hover': { color: footerColor },
                    transition: 'color 0.3s',
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                color: footerColor,
                fontWeight: 600,
                mb: 2,
              }}
            >
              Contact
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <LocationOn sx={{ fontSize: 18, color: footerColor, mt: 0.3 }} />
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  123 Garden Street<br />
                  Green City, GC 12345
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Phone sx={{ fontSize: 18, color: footerColor }} />
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Email sx={{ fontSize: 18, color: footerColor }} />
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  hello@greenhaven.com
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: '#ddd' }} />
        
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" sx={{ color: '#999', fontSize: '0.813rem' }}>
            © 2024 Mashtal | Garden Store. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link
              href="#"
              underline="none"
              sx={{
                color: '#999',
                fontSize: '0.813rem',
                '&:hover': { color: footerColor },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              underline="none"
              sx={{
                color: '#999',
                fontSize: '0.813rem',
                '&:hover': { color: footerColor },
              }}
            >
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;