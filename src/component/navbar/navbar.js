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
import { Link, useNavigate, useLocation } from "react-router-dom"; // ✅ ضفنا useLocation
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/reducers/authReducer"; 
import { switchLanguage } from "../../redux/reducers/langReducer";
import routes from "./routes";

export default function NavBar() {
  const { token } = useSelector((state) => state.auth); 
  const { translations, lang } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ عشان نعرف إحنا فين

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

            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Panto
            </Typography>


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
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
