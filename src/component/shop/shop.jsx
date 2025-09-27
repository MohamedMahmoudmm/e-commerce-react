import React, { useEffect, useState } from "react";
import {
  IconButton, Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Paper,
  Container,
  InputBase,
  Rating,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingCart, Favorite } from "@mui/icons-material";

import { fetchAllProducts } from "../../redux/reducers/allProductReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Sidebar = ({ categories = [], onFilterChange, selectedCategories = [] }) => (
  <Box
    sx={{
      width: { xs: "100%", md: "250px" },
      padding: 2,
      backgroundColor: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      mb: { xs: 2, md: 0 },
    }}
  >
    <Typography variant="h6">Filters</Typography>

    <Box sx={{ mt: 2 }}>
      <Typography>Category</Typography>
      {categories.map((cat) => (
        <Box key={cat._id}>
          <input
            type="checkbox"
            id={cat._id}
            value={cat._id}                          // نستخدم الـ id
            checked={selectedCategories.includes(cat._id)} // عشان يبقى controlled
            onChange={(e) => onFilterChange(e.target.value, e.target.checked)}
          />
          <label htmlFor={cat._id} style={{ marginLeft: 8 }}>{cat.cat_name}</label>
        </Box>
      ))}
    </Box>
  </Box>
);

const IlanaGrocery = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const allProduct = useSelector((state) => state.allProduct.All_Product || []); // fallback safeguard
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
    axios
      .get("http://127.0.0.1:3000/categories")
      .then((res) => setCategories(res.data.data || []))
      .catch((err) => console.log(err));
  }, [dispatch]);

  // handle filter (نخزن _id)
  const handleFilterChange = (catId, checked) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, catId]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== catId));
    }
  };

  // <-- التعديل الحاسم هنا: نفلتر بحسب p.category._id
  const filteredProducts =
    selectedCategories.length > 0
      ? allProduct.filter((p) => selectedCategories.includes(p.category?._id))
      : allProduct;

  // debug (حطها مؤقتاً لو حابب تشوف القيم)
  // console.log("selectedCategories:", selectedCategories);
  // console.log("filteredProducts length:", filteredProducts.length);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Search Section */}
      <Box sx={{
        backgroundColor: "#051a3dff",
        padding: 4,
        textAlign: "center",
        borderRadius: "0px 0px 25px 25px",
        mb: 4,
        pt: 10,
      }}>
        <Paper component="form" sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          borderRadius: "30px",
          bgcolor: "rgba(255,255,255,0.2)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}>
          <InputBase sx={{ ml: 3, flex: 1, color: "white" }} placeholder="Search" inputProps={{ "aria-label": "search furniture" }} />
          <IconButton type="submit" sx={{ p: "8px", bgcolor: "#ff7b00", color: "white", borderRadius: "50%" }}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Sidebar
          categories={categories}
          onFilterChange={handleFilterChange}
          selectedCategories={selectedCategories} // مررناله علشان checked يبقى متزامن
        />

        {/* Main Content */}
        <Paper elevation={0} sx={{ minHeight: "100vh", py: 4, pt: 5 }}>
          <Container maxWidth="xl">
            <Box textAlign="center" mb={3}>
              <Typography variant="h3" color="#2c2c2cff">find your best product</Typography>
            </Box>
            <Grid container spacing={3} justifyContent="center">
              {filteredProducts.map((item) => (
                <Grid item xs={12} sm={6} md={3} lg={2.4} xl={2} key={item._id} display="flex" justifyContent="center">
                  <Card elevation={3} sx={{
                    width: "100%",
                    maxWidth: { xs: "100%", sm: 300, md: 260, lg: 240, xl: 220 },
                    transition: "all 0.3s",
                    borderRadius: 3,
                    "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
                  }}>
                    <Box position="relative">
                      <IconButton sx={{ position: "absolute", top: 8, right: 8, bgcolor: "white", "&:hover": { bgcolor: "grey.100" } }}>
                        <Favorite />
                      </IconButton>

                      <CardMedia component="img" height="220" image={item.images[0] || ""} alt={item.name} sx={{ objectFit: "contain", display: "block", mx: "auto" }} />
                    </Box>

                    <CardContent sx={{ p: { xs: 3, sm: 2 } }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {item.category?.cat_name}
                      </Typography>

                      <Typography variant="h6" fontWeight="bold" gutterBottom fontSize={{ xs: 16, sm: 15 }}>
                        {item.name}
                      </Typography>

                      <Box display="flex" alignItems="center" mb={2}>
                        <Rating value={item.rating || 0} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary" ml={1}>
                          ({item.rating || 0}.0)
                        </Typography>
                      </Box>

                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight="bold" color="text.primary" fontSize={{ xs: 18, sm: 16 }}>
                          ${item.price}
                        </Typography>

                        <Box>
                          <IconButton sx={{ bgcolor: "#051a3dff", color: "white", "&:hover": { bgcolor: "primary.dark" } }} size="small">
                            <ShoppingCart />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

       
          </Container>
        </Paper>
      </Box>
    </Box>
  );
};

export default IlanaGrocery;
