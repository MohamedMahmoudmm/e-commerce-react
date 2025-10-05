import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  Link,
  IconButton,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Email,
  Phone,
  LocationOn,
  Send,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Footer = () => {
  const { translations } = useSelector((state) => state.language);
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter email:', email);
    setEmail('');
  };

  const quickLinks = [
    { text: translations?.Home || 'Home', href: '/' },
    { text: translations?.About || 'About Us', href: '/about' },
    { text: translations?.Products || 'Products', href: '/products' },
    { text: translations?.Contact || 'Contact', href: '/contact' },
  ];

  const supportLinks = [
    { text: translations?.Shipping || 'Shipping Info', href: '/shipping' },
    { text: translations?.Returns || 'Returns', href: '/returns' },
    { text: translations?.Privacy || 'Privacy Policy', href: '/privacy' },
    { text: translations?.Terms || 'Terms of Service', href: '/terms' },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#051a3dff',
        color: 'white',
        py: { xs: 4, md: 6 },
        mt: 'auto', // 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {translations?.Company_Name || 'Your E-Shop'}
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ mb: 2 }}>
              {translations?.Company_Description || 'Your trusted online store for quality products.'}
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon sx={{ color: 'inherit', minWidth: 30 }}>
                  <LocationOn fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={translations?.Address || 'Cairo, Egypt'} />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: 'inherit', minWidth: 30 }}>
                  <Phone fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={translations?.Phone || '+20 123 456 789'} />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: 'inherit', minWidth: 30 }}>
                  <Email fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={translations?.Email || 'info@yourshop.com'} />
              </ListItem>
            </List>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {translations?.Quick_Links || 'Quick Links'}
            </Typography>
            <List dense>
              {quickLinks.map((link) => (
                <ListItem key={link.text} disablePadding>
                  <ListItemText>
                    <Link href={link.href} color="inherit" underline="hover" sx={{ cursor: 'pointer' }}>
                      {link.text}
                    </Link>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {translations?.Support || 'Support'}
            </Typography>
            <List dense>
              {supportLinks.map((link) => (
                <ListItem key={link.text} disablePadding>
                  <ListItemText>
                    <Link href={link.href} color="inherit" underline="hover" sx={{ cursor: 'pointer' }}>
                      {link.text}
                    </Link>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {translations?.Newsletter || 'Newsletter'}
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ mb: 2 }}>
              {translations?.Newsletter_Description || 'Subscribe to get updates on new products!'}
            </Typography>
            <Box component="form" onSubmit={handleNewsletterSubmit} sx={{ display: 'flex', gap: 1 }}>
              <TextField
                variant="outlined"
                placeholder={translations?.Enter_Email || 'Enter your email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              <Button
                type="submit"
                variant="contained"
                startIcon={<Send />}
                sx={{ borderRadius: 2, textTransform: 'none', backgroundColor: '#ff7b00', '&:hover': { backgroundColor: '#ff7b00' } }}
              >
                {translations?.Subscribe || 'Subscribe'}
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="inherit">
                {translations?.Follow_Us || 'Follow us:'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <IconButton color="inherit" aria-label="Facebook">
                  <Facebook />
                </IconButton>
                <IconButton color="inherit" aria-label="Twitter">
                  <Twitter />
                </IconButton>
                <IconButton color="inherit" aria-label="Instagram">
                  <Instagram />
                </IconButton>
                <IconButton color="inherit" aria-label="YouTube">
                  <YouTube />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center', pt: 2 }}>
          <Typography variant="body2" color="inherit">
            &copy; {new Date().getFullYear()} {translations?.Company_Name || 'Your E-Shop'}. {translations?.All_Rights_Reserved || 'All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;