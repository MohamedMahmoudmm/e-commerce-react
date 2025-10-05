import { useEffect, useState, useRef } from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Container,
  Button,
  Card,
  CardMedia,
  CardContent,
  Rating,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, getCategories } from "../../redux/reducers/allProductReducer";
import { axiosInstance } from "../../Axios/AxiosInstance";

const AdminAllProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(13);
  const [editProductId, setEditProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });
  const formRef = useRef(null); // Ref for scrolling to the form

  const { translations } = useSelector((state) => state.language);
  const allProduct = useSelector((state) => state.allProduct.All_Product || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
    getCategories()
      .then((res) => setCategories(res.data.data || []))
      .catch((err) => console.log(err));
  }, [dispatch]);

  // Scroll to form after edit mode is activated
  useEffect(() => {
    if (editProductId && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [editProductId]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPage(1);
  };

  const handleEditClick = (product) => {
    // Populate form with product data for editing
    setEditProductId(product._id);
    setNewProduct({
      name: product.name,
      price: product.price,
      category: product.category?._id || "",
      image: product.images[0] || "",
      stock: product.stock || "",
    });
    // Scroll will happen in useEffect after render
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();
    const productData = {
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category,
      images: [newProduct.image],
      stock: Number(newProduct.stock),
    };

    if (editProductId) {
      // Update existing product
      axiosInstance
        .put(`api/products/${editProductId}`, productData)
        .then(() => {
          dispatch(fetchAllProducts()); // Refresh products after update
          setEditProductId(null); // Exit edit mode
          setNewProduct({ name: "", price: "", category: "", image: "", stock: "" }); // Reset form
        })
        .catch((err) => console.log(err));
    }
  };

  let filteredProducts = selectedCategory
    ? allProduct.filter((p) => p.category?._id === selectedCategory)
    : allProduct;

  const totalPages = Math.ceil(filteredProducts.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Category Dropdown Section */}
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
          <FormControl fullWidth sx={{ ml: 3, color: "white" }}>
            <InputLabel sx={{ color: "white", transform: "translate(14px, 10px) scale(1)" }}>
              {translations?.Category || "Select Category"}
            </InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              sx={{
                color: "white",
                "& .MuiSvgIcon-root": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiSelect-select": { py: 1.5 },
              }}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.cat_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </Box>

      {/* Main Content */}
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          minHeight: "100vh",
          py: 4,
          pt: 5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xl">
          <Box textAlign="center" mb={3}>
            <Typography variant="h3" color="#2c2c2cff">
              {translations?.Best || "Admin Products"}
            </Typography>
          </Box>

          {/* Edit Product Form - Only show when editing */}
          {editProductId && (
            <Box
              component="form"
              onSubmit={handleAddOrUpdateProduct}
              ref={formRef}
              sx={{
                mb: 4,
                p: 3,
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                bgcolor: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Edit Product
              </Typography>
              <TextField
                fullWidth
                size="small"
                label="Product Name"
                name="name"
                value={newProduct.name}
                onChange={handleNewProductChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "& fieldset": { borderColor: "#ccc" },
                    "&:hover fieldset": { borderColor: "#ff7b00" },
                    "&.Mui-focused fieldset": { borderColor: "#ff7b00" },
                  },
                  "& .MuiInputLabel-root": { color: "#666" },
                  "& .MuiInputLabel-shrink": { transform: "translate(14px, -6px) scale(0.75)" },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={handleNewProductChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "& fieldset": { borderColor: "#ccc" },
                    "&:hover fieldset": { borderColor: "#ff7b00" },
                    "&.Mui-focused fieldset": { borderColor: "#ff7b00" },
                  },
                  "& .MuiInputLabel-root": { color: "#666" },
                  "& .MuiInputLabel-shrink": { transform: "translate(14px, -6px) scale(0.75)" },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Stock"
                name="stock"
                type="number"
                value={newProduct.stock}
                onChange={handleNewProductChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "& fieldset": { borderColor: "#ccc" },
                    "&:hover fieldset": { borderColor: "#ff7b00" },
                    "&.Mui-focused fieldset": { borderColor: "#ff7b00" },
                  },
                  "& .MuiInputLabel-root": { color: "#666" },
                  "& .MuiInputLabel-shrink": { transform: "translate(14px, -6px) scale(0.75)" },
                }}
              />
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: "#666" }}>
                  {translations?.Category || "Category"}
                </InputLabel>
                <Select
                  name="category"
                  value={newProduct.category}
                  onChange={handleNewProductChange}
                  required
                  sx={{
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#ccc" },
                      "&:hover fieldset": { borderColor: "#ff7b00" },
                      "&.Mui-focused fieldset": { borderColor: "#ff7b00" },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.cat_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                size="small"
                label="Image URL"
                name="image"
                type="text"
                value={newProduct.image}
                onChange={handleNewProductChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "& fieldset": { borderColor: "#ccc" },
                    "&:hover fieldset": { borderColor: "#ff7b00" },
                    "&.Mui-focused fieldset": { borderColor: "#ff7b00" },
                  },
                  "& .MuiInputLabel-root": { color: "#666" },
                  "& .MuiInputLabel-shrink": { transform: "translate(14px, -6px) scale(0.75)" },
                }}
              />
              <Button
                type="submit"
                sx={{
                  bgcolor: "#ff7b00",
                  color: "white",
                  "&:hover": { bgcolor: "#e66e00" },
                  mt: 1,
                  borderRadius: "8px",
                }}
              >
                Update Product
              </Button>
            </Box>
          )}

          <Grid container spacing={3} justifyContent="center">
            {paginatedProducts.map((product) => (
              <Grid
                item
                key={product._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{ display: "flex" }}
              >
                <Card
                  sx={{
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CardMedia
                      component="img"
                      image={product.images[0]}
                      alt={product.name}
                      sx={{
                        width: 180,
                        height: 200,
                        objectFit: "contain",
                        borderRadius: "12px",
                        bgcolor: "#F7F7F7",
                      }}
                    />
                  </Box>

                  <CardContent sx={{ textAlign: "left", flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {product.category?.cat_name || "No Category"}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {product.name}
                    </Typography>
                    <Rating
                      value={product.rating}
                      readOnly
                      size="small"
                      sx={{ mt: 1, mb: 1 }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          ${product.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Stock: {product.stock || 0}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => handleEditClick(product)}
                        sx={{
                          bgcolor: "#001f54",
                          color: "white",
                          "&:hover": { bgcolor: "#003080" },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              flexWrap: { xs: "wrap", sm: "nowrap" },
              overflowX: { xs: "auto", sm: "visible" },
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
  );
};

export default AdminAllProduct;