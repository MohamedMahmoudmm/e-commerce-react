import {
  Typography,
  Box,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { switchLanguage } from "../../redux/reducers/langReducer";
import languageSlice from "../../redux/reducers/langReducer";
export default function HeroSection() {

const { translations, lang } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  return (
    <>
       {/* <h1>{translations.welcome}</h1>
      <button
        onClick={() => dispatch(switchLanguage("en"))}
        disabled={lang === "en"}
      >
        English
      </button>
      <button
        onClick={() => dispatch(switchLanguage("ar"))}
        disabled={lang === "ar"}
      >
        العربية
      </button> */}
      {/* Hero Section */}
      <Box
  sx={{
    backgroundImage: "url('./back2.png')",
    backgroundSize: "cover",       // make image cover entire box
    backgroundRepeat: "no-repeat", // prevent tiling
    backgroundPosition: "center",  // center the image
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "top",
    textAlign: "center",
    px: 2,
    
  }}
>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "white",
            maxWidth: "800px",
            mb: 2,
            mt:10
          }}
        >
          {translations.welcome}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{ color: "gray", maxWidth: "500px", mb: 4 }}
        >
          {translations.description}
        </Typography>

        {/* Search bar */}
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
              borderRadius: "30px",
              bgcolor: "rgba(255,255,255,0.2)", // semi-transparent white
              border: "1px solid rgba(255,255,255,0.3)",
              transition: "transform 0.3s ease", // smooth animation
              "&:hover": {
                  transform: "scale(1.05)",       // enlarge by 5% on hover
                  boxShadow: 4,                   // add some elevation on hover
              },
          }}
        >
          <InputBase
            sx={{ ml: 3, flex: 1 ,color:"white"}}
            placeholder="Search"
            inputProps={{ "aria-label": "search furniture" }}
          />
          <IconButton type="submit" sx={{ p: "8px", bgcolor: "#ff7b00", color: "white", borderRadius: "50%" }}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      
    </>
  );
}
