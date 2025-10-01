import { useEffect, useState } from "react";
import {
  IconButton,
  Grid,
  Box,
  Typography,
  Paper,
  Container,
  InputBase,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { fetchAllProducts, getCategories } from "../../redux/reducers/allProductReducer";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../productCard/productCard";

const Sidebar = ({ categories = [], onFilterChange, selectedCategories = [] }) => {
    const { translations, lang } = useSelector((state) => state.language);
  const dispatch = useDispatch();
return(


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
    <Typography variant="h6">{translations?.Filters}</Typography>

    <Box sx={{ mt: 2 }}>
      <Typography>{translations?.Category}</Typography>
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
}

const IlanaGrocery = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); // 📌 صفحة حالية
  const [limit] = useState(8); // 📌 عدد المنتجات لكل صفحة
const { translations, lang } = useSelector((state) => state.language);

  const allProduct = useSelector((state) => state.allProduct.All_Product || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
    getCategories()
      .then((res) => setCategories(res.data.data || []))
      .catch((err) => console.log(err));
  }, [dispatch]);






  
  const handleFilterChange = (catId, checked) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, catId]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== catId));
    }
    setPage(1); // إعادة ضبط الصفحة عند تغيير الفلتر
  };

  let filteredProducts =
    selectedCategories.length > 0
      ? allProduct.filter((p) => selectedCategories.includes(p.category?._id))
      : allProduct;

  if (searchTerm.trim() !== "") {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const totalPages = Math.ceil(filteredProducts.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

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
          onSubmit={(e) => e.preventDefault()}
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
            value={searchTerm}
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
                {translations?.Best}
              </Typography>
            </Box>

            <Grid container spacing={3} justifyContent="center">
              {paginatedProducts.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
            </Grid>

            {/* Pagination Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
  <Button
    disabled={page === 1}
    onClick={() => handlePageChange(page - 1)}
    sx={{
      mx: 1,
      bgcolor: "#ff7b00",
      color: "white",
      "&:hover": { bgcolor: "#e66e00" }, // لون أغمق عند الهوفر
      "&.Mui-disabled": { bgcolor: "#ff7b00", opacity: 0.5 }, // زرار disabled
    }}
  >
    Previous
  </Button>

  {[...Array(totalPages)].map((_, idx) => (
    <Button
      key={idx}
      onClick={() => handlePageChange(idx + 1)}
      sx={{
        mx: 0.5,
        bgcolor: page === idx + 1 ? "#ff7b00" : "transparent",
        color: page === idx + 1 ? "white" : "#ff7b00",
        border: "1px solid #ff7b00",
        "&:hover": {
          bgcolor: page === idx + 1 ? "#e66e00" : "rgba(255,123,0,0.1)",
        },
      }}
    >
      {idx + 1}
    </Button>
  ))}

  <Button
    disabled={page === totalPages}
    onClick={() => handlePageChange(page + 1)}
    sx={{
      mx: 1,
      bgcolor: "#ff7b00",
      color: "white",
      "&:hover": { bgcolor: "#e66e00" },
      "&.Mui-disabled": { bgcolor: "#ff7b00", opacity: 0.5 },
    }}
  >
    Next
  </Button>
</Box>

          </Container>
        </Paper>
      </Box>
    </Box>
  );
};

export default IlanaGrocery;
