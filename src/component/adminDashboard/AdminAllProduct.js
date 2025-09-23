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
import { useState } from "react";

function AdminAllProduct() {
  const initialProducts = [
    {
      id: 1,
      name: "Sakarias Armchair",
      category: "Chair",
      price: 392,
      rating: 4,
      image: "./chair.png",
    },
    {
      id: 2,
      name: "Baltsar Chair",
      category: "Chair",
      price: 299,
      rating: 5,
      image: "./chair2.png",
    },
    {
      id: 3,
      name: "Anjay Chair",
      category: "Chair",
      price: 519,
      rating: 4,
      image: "./chair.png",
    },
    {
      id: 4,
      name: "Nyantuy Chair",
      category: "Chair",
      price: 921,
      rating: 5,
      image: "./chair2.png",
    },
    {
      id: 5,
      name: "Another Chair",
      category: "Chair",
      price: 650,
      rating: 4,
      image: "./chair.png",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [editId, setEditId] = useState(null); // track which product is being edited
  const [editValues, setEditValues] = useState({ name: "", price: "" });

  const handleEditClick = (product) => {
    if (editId === product.id) {
      // Save mode
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? { ...p, name: editValues.name, price: Number(editValues.price) }
            : p
        )
      );
      setEditId(null); // exit edit mode
    } else {
      // Enter edit mode
      setEditId(product.id);
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
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                height: "100%",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    height: 200,
                    objectFit: "contain",
                    p: 2,
                    bgcolor: "#F7F7F7",
                  }}
                />
              </Box>

              <CardContent sx={{ textAlign: "left" }}>
                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>

                {editId === product.id ? (
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
                  {editId === product.id ? (
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
                      bgcolor: editId === product.id ? "green" : "#001f54",
                      color: "white",
                      "&:hover": {
                        bgcolor: editId === product.id ? "darkgreen" : "#003080",
                      },
                    }}
                  >
                    {editId === product.id ? <SaveIcon /> : <EditIcon />}
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
