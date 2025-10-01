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
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/reducers/authReducer"; 
import { switchLanguage } from "../../redux/reducers/langReducer";
import routes from "./routes";

export default function NavBar() {
  const { token } = useSelector((state) => state.auth); 
  const { translations, lang } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };

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
            <Box sx={{ display: "flex", gap: 4 }}>
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

            {/* Cart + Wishlist + Auth + Language */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Language Switch */}
              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { borderColor: "#ff7b00", color: "#ff7b00" },
                }}
                onClick={() =>
                  dispatch(switchLanguage(lang === "en" ? "ar" : "en"))
                }
              >
                {lang === "en" ? "العربية" : "English"}
              </Button>

              <IconButton color="inherit" component={Link} to="/wishlist">
                <FavoriteIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} to="/cart">
                <ShoppingCartIcon />
              </IconButton>

              {token ? (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  {translations?.Logout || "Logout"}
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  color="success"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  {translations?.Login || "Login"}
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
