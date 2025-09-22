import * as React from 'react';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const categories = [
  'Bedroom',
  'Dining Room',
  'Meeting Room',
  'Workspace',
  'Living Room',
  'Kitchen',
  'Living Space',
];

const rooms = [
  { name: 'Bedroom', image: '/path/to/bedroom_image.jpg' },
  { name: 'Living Room', image: '/path/to/living_room_image.jpg' },
  // ... more room data
];

const ExploreByCategory = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ mb: 4 }}>
        Explore by Category
      </Typography>

      <Grid container spacing={4}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper elevation={0} sx={{ p: 2, height: '100%', border: '1px solid #ccc' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton disabled>
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search..."
                fullWidth
                sx={{ ml: 1 }}
              />
            </Box>
            <List>
              {categories.map((category) => (
                <ListItemButton key={category}>
                  <ListItemText primary={category} />
                </ListItemButton>
              ))}
            </List>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              endIcon={<ArrowForwardIcon />}
            >
              All Categories
            </Button>
          </Paper>
        </Grid>

        {/* Main Content (Image Gallery) */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {rooms.map((room) => (
              <Grid item xs={12} sm={6} key={room.name}>
                <Card sx={{ position: 'relative', height: '100%', minHeight: 250 }}>
                  <CardMedia
                    component="img"
                    image={room.image}
                    alt={room.name}
                    sx={{ height: '100%' }}
                  />
                  {room.name === 'Bedroom' && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: 'white',
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold">
                        {room.name}
                      </Typography>
                      <Button variant="contained" sx={{ mt: 1 }}>
                        Explore
                      </Button>
                    </Box>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExploreByCategory;