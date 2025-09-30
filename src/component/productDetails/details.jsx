import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";
import { getSingleProduct } from "../../redux/reducers/allProductReducer";

export default function ViewDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching product with id:", id);

    getSingleProduct(id)
      .then((res) => {
        console.log("Product response:", res.data);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );

  if (!product)
    return (
      <Typography variant="h6" color="error" align="center" mt={4}>
        Product not found
      </Typography>
    );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* الشريط الأزرق */}
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
        <Typography variant="h4" color="white" fontWeight="bold">
          Product Details
        </Typography>
      </Box>

      {/* تفاصيل المنتج */}
      <Container sx={{ mt: 4 }}>
        <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, p: 2, gap: 3 }}>
          {/* الصورة على اليسار */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CardMedia
              component="img"
              image={product.images[0] || ""}
              alt={product.name}
              sx={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Box>

          {/* النص على اليمين */}
          <CardContent
  sx={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 2, // مسافة بين النصوص
  }}
>
  <Typography variant="h4" fontWeight="bold" gutterBottom>
    {product.name}
  </Typography>

  <Typography variant="h5" color="primary" gutterBottom>
    ${product.price}
  </Typography>

  <Typography variant="body1" gutterBottom>
    {product.description || "No description available."}
  </Typography>

  <Grid container spacing={2} justifyContent="center" mt={2}>
    <Grid item xs={12}>
      <Typography variant="subtitle1" fontWeight="bold">
        Stock:
      </Typography>
      <Typography variant="body1">
        {product.stock || "Not available"}
      </Typography>
    </Grid>
  </Grid>
</CardContent>

        </Card>

        {/* صور إضافية إذا وجدت */}
        {product.images && product.images.length > 1 && (
          <Box mt={4}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              More Images
            </Typography>
            <Grid container spacing={2}>
              {product.images.map((img, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="150"
                      image={img}
                      alt={`${product.name} image ${index + 1}`}
                      sx={{ objectFit: "contain" }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}
