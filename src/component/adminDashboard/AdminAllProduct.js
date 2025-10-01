import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Grid,
  Rating,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../Axios/AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, getAllProducts } from "../../redux/reducers/allProductReducer";

function AdminAllProduct() {

 // const [allProduct, setAllProduct] = useState([]);
 const allProduct = useSelector((state) => state.allProduct.All_Product);
    const [products, setProducts] = useState([]);
    const dispatch=useDispatch()

    useEffect(() => {
      dispatch(fetchAllProducts())
      
    }, [])
    
    useEffect(() => {
      setProducts(allProduct);
    }, [allProduct]);
  

  const [editId, setEditId] = useState(null); // track which product is being edited
  const [editValues, setEditValues] = useState({ name: "", price: "" });

  const handleEditClick = (product) => {
    if (editId === product._id) {
      // Save mode
      setProducts((prev) =>
        prev.map((p) =>
          p._id === product._id
            ? { ...p, name: editValues.name, price: Number(editValues.price) }
            : p
        )
      );
      console.log(editValues);
      
      axiosInstance.put(`api/products/${product._id}`, editValues);
      setEditId(null); // exit edit mode
    } else {
      // Enter edit mode
      setEditId(product._id);
      setEditValues({ name: product.name, price: product.price });
    }
  };

  const handleChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }} justifyContent="center">
  <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
    Best Selling Product
  </Typography>

  <Grid
    container
    spacing={2}
    justifyContent="center"
    sx={{ px: { xs: 0, sm: 4, md: 6 } }}
  >
    {products.map((product) => (
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
          }}
        >
          {/* Image section */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
         <CardMedia
          component="img"
          image={product.images[0]}
          alt={product.name}
          sx={{
            width: 180,     // الصورة تاخد عرض الكارد
            height: 200,       // ارتفاع ثابت لكل الصور
            objectFit: "contain", // يخلي الصورة تملى المساحة بشكل منظم
            borderRadius: "12px",
            bgcolor: "#F7F7F7",
          }}
        />
          </Box>

          {/* Content section fills remaining space */}
          <CardContent sx={{ textAlign: "left", flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {product.category.cat_name}
            </Typography>

            {editId === product._id ? (
              <TextField
                fullWidth
                size="small"
                name="name"
                value={editValues.name}
                onChange={handleChange}
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography variant="subtitle1" fontWeight="bold">
                {product.name}
              </Typography>
            )}

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
              {editId === product._id ? (
                <TextField
                  size="small"
                  name="price"
                  type="number"
                  value={editValues.price}
                  onChange={handleChange}
                />
              ) : (
                <Typography variant="h6" fontWeight="bold">
                  ${product.price}
                </Typography>
              )}

              <IconButton
                onClick={() => handleEditClick(product)}
                sx={{
                  bgcolor: editId === product._id ? "green" : "#001f54",
                  color: "white",
                  "&:hover": {
                    bgcolor: editId === product._id ? "darkgreen" : "#003080",
                  },
                }}
              >
                {editId === product._id ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>

  );
}

export default AdminAllProduct;
