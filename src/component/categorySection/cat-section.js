import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
} from "@mui/material";

const categories = [
  { title: "Bedroom", img: "https://i.ibb.co/3hq6yPm/bedroom.jpg" },
  { title: "Living Room", img: "https://i.ibb.co/qJvQZV9/livingroom.jpg" },
  { title: "Workspace", img: "https://i.ibb.co/qydh0Wz/workspace.jpg" },
  { title: "Meeting Room", img: "https://i.ibb.co/MZ3WDXd/meetingroom.jpg" },
  { title: "Kitchen", img: "https://i.ibb.co/sV3p6t1/kitchen.jpg" },
  { title: "Living Space", img: "https://i.ibb.co/pnN6SkP/livingspace.jpg" },
];

export default function ExploreByCategory() {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 8 }}>
      {/* Title */}
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        sx={{ mb: 5, color: "black" }}
      >
        Explore by Category
      </Typography>

      {/* Sidebar + Images side by side */}
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Sidebar */}
        <Box sx={{ flex: "0 0 250px" }}>
          <TextField
            fullWidth
            placeholder="Search"
            variant="outlined"
            sx={{
              mb: 3,
              borderRadius: "12px",
              bgcolor: "white",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
            }}
          />
          <List>
            {categories.map((cat, i) => (
              <ListItem
                key={i}
                sx={{
                  py: 1,
                  cursor: "pointer",
                  "&:hover": { color: "#ff7b00", fontWeight: "bold" },
                }}
              >
                {cat.title}
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "#ff7b00",
              borderRadius: "12px",
              textTransform: "none",
              "&:hover": { bgcolor: "darkslategray" },
            }}
          >
            All Categories →
          </Button>
        </Box>

        {/* Images grid */}
        <Box
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 3,
          }}
        >
          {categories.map((cat, i) => (
            <Box
              key={i}
              sx={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                height: 200,
                "&:hover .overlay": {
                  opacity: 1,
                },
              }}
            >
              {/* Image */}
              <Box
                component="img"
                src={cat.img}
                alt={cat.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />

              {/* Overlay (hover effect) */}
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {cat.title}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "white",
                    color: "teal",
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": { bgcolor: "teal", color: "white" },
                  }}
                >
                  Explore
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
