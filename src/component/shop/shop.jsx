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
  Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { fetchAllProducts, getCategories } from "../../redux/reducers/allProductReducer";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../productCard/productCard";

const Sidebar = ({ categories = [], onFilterChange, selectedCategories = [] }) => {
  
useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}, []);
  const { translations } = useSelector((state) => state.language);

  return (
    <Box sx={{ width: { xs: "250px", md: "250px" }, padding: 3 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: "#333",
          textAlign: "center",
          borderBottom: "2px solid #ff7b00",
          pb: 1,
        }}
      >
        {translations?.Filters}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography sx={{ mb: 1, fontWeight: 600, color: "#444" }}>
          {translations?.Category}
        </Typography>

        {categories.map((cat) => (
          <Box
            key={cat._id}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1.5,
              px: 1,
              py: 0.5,
              borderRadius: "8px",
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: "rgba(255,123,0,0.1)",
              },
            }}
          >
            <input
              type="checkbox"
              id={cat._id}
              value={cat._id}
              checked={selectedCategories.includes(cat._id)}
              onChange={(e) => onFilterChange(e.target.value, e.target.checked)}
              style={{
                accentColor: "#ff7b00",
                transform: "scale(1.2)",
              }}
            />
            <label
              htmlFor={cat._id}
              style={{
                marginLeft: 8,
                fontSize: "14px",
                color: "#333",
                cursor: "pointer",
              }}
            >
              {cat.cat_name}
            </label>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const IlanaGrocery = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { translations } = useSelector((state) => state.language);
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
    setPage(1);
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
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Search Section */}
      <Box
        sx={{
          backgroundColor: "#051a3dff",
          padding: 4,
          borderRadius: "0px 0px 25px 25px",
          mb: 4,
          pt: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
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
              "&:hover": { bgcolor: "#e66e00" },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Box sx={{ display: "flex" }}>
        {/* Sidebar في الديسكتوب */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar
            categories={categories}
            onFilterChange={handleFilterChange}
            selectedCategories={selectedCategories}
          />
        </Box>

       {/* السهم في الموبايل */}
{!openDrawer && (
  <IconButton
    onClick={() => setOpenDrawer(true)}
    sx={{
      position: "fixed",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      display: { xs: "flex", md: "none" },
      bgcolor: "#ff7b00",
      color: "white",
      zIndex: 1201,
      "&:hover": { bgcolor: "#e66e00" },
    }}
  >
    <ArrowForwardIosIcon />
  </IconButton>
)}

{/* زر الإغلاق لما السايدبار مفتوح */}
{openDrawer && (
  <IconButton
    onClick={() => setOpenDrawer(false)}
    sx={{
      position: "fixed",
      top: 10,
      left: 10,
      display: { xs: "flex", md: "none" },
      bgcolor: "#ff7b00",
      color: "white",
      zIndex: 1300,
      "&:hover": { bgcolor: "#e66e00" },
    }}
  >
    <CloseIcon />
  </IconButton>
)}

{/* Drawer في الموبايل */}
<Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
  <Sidebar
    categories={categories}
    onFilterChange={handleFilterChange}
    selectedCategories={selectedCategories}
  />
</Drawer>

        {/* Main Content */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            minHeight: "100vh",
            py: 4,
            pt: 5,
            display: "flex",
            justifyContent: "center", // يخلي الكروت في النص
          }}
        >
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

            {/* Pagination */}
          {/* Pagination Buttons */}
<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    mt: 4,
    flexWrap: { xs: "wrap", sm: "nowrap" }, // يلف في الموبايل
    overflowX: { xs: "auto", sm: "visible" }, // سكرول في الشاشات الصغيرة
    gap: 1,
    px: 1,
  }}
>
  <Button
    disabled={page === 1}
    onClick={() => handlePageChange(page - 1)}
    sx={{
      flexShrink: 0,
      bgcolor: "#ff7b00",
      color: "white",
      fontSize: { xs: "12px", sm: "14px" },
      px: { xs: 1.5, sm: 2 },
      "&:hover": { bgcolor: "#e66e00" },
      "&.Mui-disabled": { bgcolor: "#ff7b00", opacity: 0.5 },
    }}
  >
    Previous
  </Button>

  {[...Array(totalPages)].map((_, idx) => (
    <Button
      key={idx}
      onClick={() => handlePageChange(idx + 1)}
      sx={{
        flexShrink: 0,
        fontSize: { xs: "12px", sm: "14px" },
        minWidth: { xs: "32px", sm: "40px" },
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
      flexShrink: 0,
      bgcolor: "#ff7b00",
      color: "white",
      fontSize: { xs: "12px", sm: "14px" },
      px: { xs: 1.5, sm: 2 },
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