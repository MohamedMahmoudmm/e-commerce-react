import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function NavBar() {
  return (
    <>
      {/* Navbar */}
      <AppBar
        position="absolute"
        sx={{ background: "transparent", boxShadow: "none", color: "white" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Logo */}
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Panto
            </Typography>

            {/* Links */}
            <Box sx={{ display: "flex", gap: 4}}>
              {["Furniture", "Shop", "About Us", "Contact"].map((item) => (
                <Button
                  key={item}
                  sx={{ color: "white", fontWeight: 500, textTransform: "none",
                    transition: "transform 0.3s ease", // smooth animation
              "&:hover": {
                  transform: "scale(1.05)",
                  bgcolor:"#ff7b00" ,      // enlarge by 5% on hover
                  boxShadow: 4,                   // add some elevation on hover
              },
                   }}
                >
                  {item}
                </Button>
              ))}
            </Box>

            {/* Cart */}
            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>     
    </>
  );
}
