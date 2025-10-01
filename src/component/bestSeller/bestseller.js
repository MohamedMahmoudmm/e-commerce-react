import React, { use, useEffect, useState } from "react";
import {
    Box,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Button,
    Rating,
    Snackbar,
    Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import { axiosInstance } from "../../Axios/AxiosInstance";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: "absolute",
                top: "40%",
                right: -20,
                bgcolor: "white",
                boxShadow: 2,
                zIndex: 2,
            }}
        >
            <ArrowForwardIosIcon />
        </IconButton>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: "absolute",
                top: "40%",
                left: -20,
                bgcolor: "white",
                boxShadow: 2,
                zIndex: 2,
            }}
        >
            <ArrowBackIosNewIcon />
        </IconButton>
    );
}

export default function BestSeller() {
    const [category, setCategory] = useState(null);
const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
      const { translations, lang } = useSelector((state) => state.language);
  const dispatch = useDispatch();
    const handleCategoryChange = (event, newCategory) => {
        if (newCategory) setCategory(newCategory);
        console.log(newCategory);
        
       
    };
useEffect(() => {
     category && axiosInstance.post("/api/products/category", { cat: [category] }).then((res) => {
            setProducts(res.data);
        })
},[category])

    useEffect(() => {
        axiosInstance.get("/categories").then((res) => {
            setCategories(res.data.data);
        })
        axiosInstance.get("/api/products").then((res) => {
            console.log(res.data.products);
            setProducts(res.data.products);
            
        })
    },[])
const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
    function AddToCart(id) {
        axiosInstance.post("/cart", { productId: id, quantity: 1 }).then((res) => {
            console.log(res);
              setSnackbar({
        open: true,
        message: `Product added to cart successfully`,
        severity: "info",
      });
        });
    }

    const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
    


    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    return (
        <Box sx={{ py: 8, textAlign: "center",bgcolor: "#F7F7F7" }}>
            {/* Title */}
            <Typography variant="h4" fontWeight="bold" mb={4}>
                {translations?.Seller}
            </Typography>

            {/* Categories */}
            <ToggleButtonGroup
                value={category}
                exclusive
                onChange={handleCategoryChange}
                sx={{
                    mb: 6,
                    backgroundColor: "#EEEEEE",
                    borderRadius: "50px",
                    p: 1,
                }}
            >
                {categories.map((cat) => (
                    <ToggleButton
                        key={cat._id}
                        value={cat._id}
                        sx={{
                            textTransform: "none",
                            border: "none",
                            borderRadius: "50px !important",
                            px: 3,
                        }}
                    >
                        {cat.cat_name}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            {/* Product Carousel */}
            <Box sx={{ position: "relative", px: 6}}>
                <Slider {...settings}>
                    {products.map((product) => (
                        <Box key={product._id} px={1} >
                            <Card
                                sx={{
                                    borderRadius: "16px",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                                    mx: 0.3,
                                    
                                }}
                            >
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <CardMedia
                                    component="img"
                                    image={product.images[0]}
                                    alt={product.name}
                                    sx={{ height: 200, objectFit: "contain", p: 2 ,bgcolor: "#F7F7F7" }}
                                />
                                    </Box>
                                
                                <CardContent sx={{ textAlign: "left" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.cat_name}
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
                                        <Typography variant="h6" fontWeight="bold">
                                            ${product.price}
                                        </Typography>
                                        <IconButton
                                            onClick={() => AddToCart(product._id)}
                                            sx={{
                                                bgcolor: "#001f54",
                                                color: "white",
                                                "&:hover": { bgcolor: "#003080" },
                                            }}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Slider>
            </Box>

            {/* View All */}
            <Button
            component={Link}
            to="/shop"
                sx={{
                    mt: 4,
                    textTransform: "none",
                    color: "orange",
                    fontWeight: "bold",
                }}
            >
                View All →
            </Button>
            <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <Alert
                      onClose={handleClose}
                      severity={snackbar.severity}
                      sx={{ width: "100%" }}
                    >
                      {snackbar.message}
                    </Alert>
                  </Snackbar>
        </Box>
    );
}
