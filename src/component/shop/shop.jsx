import React, { useEffect, useState } from "react";
import { toggleFavorite } from "../../redux/reducers/favReducer";
import {
  IconButton,
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Paper,
  Container,
  InputBase,
  Rating,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingCart, Favorite } from "@mui/icons-material";

import { fetchAllProducts, getCategories } from "../../redux/reducers/allProductReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ProductCard from "../productCard/productCard";

const Sidebar = ({
  categories = [],
  onFilterChange,
  selectedCategories = [],
}) => (
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
            value={cat._id}
            checked={selectedCategories.includes(cat._id)}
            onChange={(e) => onFilterChange(e.target.value, e.target.checked)}
          />
          <label htmlFor={cat._id} style={{ marginLeft: 8 }}>
            {cat.cat_name}
          </label>
        </Box>
      ))}
    </Box>
  </Box>
);

const IlanaGrocery = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🆕 search state
  const allProduct = useSelector((state) => state.allProduct.All_Product || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
    // axios.get("http://127.0.0.1:3000/categories")
      getCategories().then((res) => setCategories(res.data.data || []))
      .catch((err) => console.log(err));
  }, [dispatch]);

  const handleFilterChange = (catId, checked) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, catId]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== catId));
    }
  };

  // الفلترة بالكاتيجوري
  let filteredProducts =
    selectedCategories.length > 0
      ? allProduct.filter((p) => selectedCategories.includes(p.category?._id))
      : allProduct;

  // 🆕 الفلترة بالسيرش
  if (searchTerm.trim() !== "") {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Search Section */}
      <Box
        sx={{
          backgroundColor: "#051a3dff",
          padding: 4,
          textAlign: "center",
          borderRadius: "0px 0px 25px 25px",
          mb: 4,
          pt: 10,
        }}
      >
        <Paper
          component="form"
          onSubmit={(e) => e.preventDefault()} // 🛑 منع الريلود
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            borderRadius: "30px",
            bgcolor: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <InputBase
            sx={{ ml: 3, flex: 1, color: "white" }}
            placeholder="Search"
            value={searchTerm} // 🆕 مربوط بالستيت
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{
              p: "8px",
              bgcolor: "#ff7b00",
              color: "white",
              borderRadius: "50%",
            }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Sidebar
          categories={categories}
          onFilterChange={handleFilterChange}
          selectedCategories={selectedCategories}
        />

        {/* Main Content */}
        <Paper elevation={0} sx={{ minHeight: "100vh", py: 4, pt: 5 }}>
          <Container maxWidth="xl">
            <Box textAlign="center" mb={3}>
              <Typography variant="h3" color="#2c2c2cff">
                find your best product
              </Typography>
            </Box>
            <Grid container spacing={3} justifyContent="center">
              {filteredProducts.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
            </Grid>
          </Container>
        </Paper>
      </Box>
    </Box>
  );
};

export default IlanaGrocery;
