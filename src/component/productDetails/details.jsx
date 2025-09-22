import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, Rating, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductDetailsPage = () => {
  return (
    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
      <Card
        sx={{
          display: 'flex',
          width: '100%',
          height: '400px',
          flexDirection: { xs: 'column', sm: 'row' },
          overflow: 'hidden',
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: '50%' }, backgroundColor: '#e0e0e0' }}>
          <CardMedia
            component="img"
            image="./exp.png" // استبدل بمسار الصورة الحقيقي
            alt="Ilana Sofa"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <CardContent
          sx={{
            width: { xs: '100%', sm: '50%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px',
            position: 'relative',
            textAlign: 'left',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <IconButton aria-label="add to favorites" sx={{ ml: 'auto' }}>
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
          <div>
            <Typography variant="h5">Ilana</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              A sectional sofa or an L-shaped sofa can make a great addition to your living room based on your needs.
            </Typography>
            <Typography variant="h6">$430.99</Typography>
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#333' } }}
            >
              Add to basket
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetailsPage;