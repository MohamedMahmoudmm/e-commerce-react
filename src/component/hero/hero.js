import {
  Typography,
  Box,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
export default function HeroSection() {
  const { translations, lang } = useSelector((state) => state.language);
  const dispatch = useDispatch();

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url('./back2.png')",
          backgroundSize: "cover",       
          backgroundRepeat: "no-repeat", 
          backgroundPosition: "center",  
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",  
          textAlign: "center",
          px: { xs: 1, sm: 2, md: 4 }, 
          py: { xs: 2, md: 4 },          
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "white",
            maxWidth: { xs: "100%", sm: "500px", md: "800px" },
            mb: 2,
            mt: { xs: 2, md: 10 },         
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
          }}
        >
          {translations.welcome}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{ 
            color: "gray", 
            maxWidth: { xs: "100%", sm: "400px", md: "500px" },
            mb: { xs: 2, md: 4 },
            fontSize: { xs: "1rem", md: "1.25rem" }, 
            px: 1, 
          }}
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
            width: { xs: "100%", sm: "80%", md: 400 }, 
            maxWidth: 400, 
            borderRadius: "30px",
            bgcolor: "rgba(255,255,255,0.2)", 
            border: "1px solid rgba(255,255,255,0.3)",
            transition: "transform 0.3s ease", 
            "&:hover": {
              transform: "scale(1.05)",      
              boxShadow: 4,                   
            },
            mx: { xs: 1, md: 0 }, 
          }}
        >
          <InputBase
            sx={{ 
              ml: { xs: 1, md: 3 }, 
              flex: 1, 
              color: "white",
              "& .MuiInputBase-input": { 
                "::placeholder": {
                  color: "rgba(255,255,255,0.7)",
                  opacity: 1,
                },
              },
            }}
            placeholder="Search"
            inputProps={{ "aria-label": "search furniture" }}
          />
          <IconButton 
            type="submit" 
            sx={{ 
              p: "8px", 
              bgcolor: "#ff7b00", 
              color: "white", 
              borderRadius: "50%",
              "&:hover": { bgcolor: "#e56e00" },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </>
  );
}