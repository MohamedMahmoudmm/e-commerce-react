import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; // 👈 أيقونة الإكس
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/reducers/authReducer";
import { switchLanguage } from "../../redux/reducers/langReducer";
import { useState } from "react";
import routes from "./routes";

export default function NavBar() {
  const { token } = useSelector((state) => state.auth);
  const { translations, lang } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };

  return (
    <>
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

            {/* Desktop Links */}
            {localStorage.getItem("role") !== "admin" && (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 4,
                  ml: "auto",
                  mr: 4,
                }}
              >
                {routes[lang].map((item) => (
                  <Button
                    component={Link}
                    to={item.path}
                    key={item.label}
                    sx={{
                      color: "white",
                      fontWeight: 500,
                      textTransform: "none",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        bgcolor: "#ff7b00",
                        boxShadow: 4,
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

      {/* Desktop Right Section */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 2, // 👈 يبعد كل العناصر عن بعض
          }}
        >
          {/* 👇 دول هيختفوا لو اليوزر أدمن */}
          {localStorage.getItem("role") !== "admin" && (
            <>
              <IconButton color="inherit" component={Link} to="/wishlist">
                <FavoriteIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} to="/cart">
                <ShoppingCartIcon />
              </IconButton>
            </>
          )}
        {/* Language Switch 👈 هيفضل جنب اللوجين */}
          <Button
            variant="outlined"
            sx={{
              borderColor: "white",
              color: "#888887ff",
              borderColor: "#888887ff",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { borderColor: "#ff7b00" , color: "#ff7b00"},
            }}
            onClick={() => dispatch(switchLanguage(lang === "en" ? "ar" : "en"))}
          >
            {lang === "en" ? "AR" : "EN"}
          </Button>
          {/* Auth Buttons */}
          {token ? (
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                backgroundColor: "#ff7b00",
                color: "white",
                "&:hover": {
                  backgroundColor: "#e56e00",
                },
              }}
            >
              {translations?.Logout || "Logout"}
            </Button>
          ) : location.pathname === "/login" ? (
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              color="success"
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Register
            </Button>
          ) : location.pathname === "/signup" ? (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="success"
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Login
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="success"
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              {translations?.Login || "Login"}
            </Button>
          )}

         
        </Box>


            {/* Mobile Menu Button */}
            {!open && (
              <IconButton
                sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        {/* Close Button */}
        <IconButton
          sx={{
            color: "#ff7b00",
            position: "absolute",
            top: 10,
            right: 10,
          }}
          onClick={() => setOpen(false)}
        >
          <CloseIcon fontSize="large" />
        </IconButton>

        <List sx={{ width: 250, mt: 6 }}>
          {routes[lang].map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setOpen(false)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        {/* Icons in Mobile */}
          {localStorage.getItem("role") !== "admin" && (
            <ListItem sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <IconButton color="inherit" component={Link} to="/wishlist">
                <FavoriteIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} to="/cart">
                <ShoppingCartIcon />
              </IconButton>
            </ListItem>
          )}

          {/* Language Switch in Mobile */}
          <ListItem>
            <Button
              fullWidth
              variant="outlined"
              sx={{ textTransform: "none", fontWeight: "bold" }}
              onClick={() =>
                dispatch(switchLanguage(lang === "en" ? "ar" : "en"))
              }
            >
              {lang === "en" ? "العربية" : "English"}
            </Button>
          </ListItem>
          {/* Auth in Mobile */}
          ...
        </List>
      </Drawer>
    </>
  );
}
