import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Button,
    Rating,
    Snackbar,
    Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";  //  useTheme from styles
import useMediaQuery from "@mui/material/useMediaQuery";  //  useMediaQuery separate import
import AddIcon from "@mui/icons-material/Add";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
                right: { xs: 10, md: -20 },
                bgcolor: "white",
                boxShadow: 2,
                zIndex: 2,
                width: 40,
                height: 40,
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
                left: { xs: 10, md: -20 },
                bgcolor: "white",
                boxShadow: 2,
                zIndex: 2,
                width: 40,
                height: 40,
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

    // Dynamic slidesToShow using useMediaQuery for small screens
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // Below 900px considered small

    const handleCategoryChange = (event, newCategory) => {
        if (newCategory) setCategory(newCategory);
        console.log(newCategory);
    };

    useEffect(() => {
        category && axiosInstance.post("/api/products/category", { cat: [category] }).then((res) => {
            setProducts(res.data);
        })
    }, [category])

    useEffect(() => {
        axiosInstance.get("/categories").then((res) => {
            setCategories(res.data.data);
        })
        axiosInstance.get("/api/products").then((res) => {
            console.log(res.data.products);
            setProducts(res.data.products);
        })
    }, [])

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
        slidesToShow: isSmallScreen ? 1 : 4,  //  Dynamic: 1 on small screens, 4 on large
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: { 
                    slidesToShow: 4,
                    slidesToScroll: 1 
                }
            },
            {
                breakpoint: 1024,
                settings: { 
                    slidesToShow: 3,
                    slidesToScroll: 1 
                }
            },
            {
                breakpoint: 900,  //  Added breakpoint at 900px for safety
                settings: { 
                    slidesToShow: 1,
                    slidesToScroll: 1 
                }
            },
            {
                breakpoint: 600,
                settings: { 
                    slidesToShow: 1,
                    slidesToScroll: 1 
                }
            },
        ],
    };

    return (
        <Box sx={{ py: { xs: 4, md: 8 }, textAlign: "center", bgcolor: "#F7F7F7" }}>
            {/* Title */}
            <Typography variant="h4" fontWeight="bold" mb={4} sx={{ fontSize: { xs: "1.75rem", md: "2.125rem" } }}>
                {translations?.Seller}
            </Typography>

            {/* Categories */}
            <ToggleButtonGroup
                value={category}
                exclusive
                onChange={handleCategoryChange}
                sx={{
                    mb: { xs: 3, md: 6 },
                    backgroundColor: "#EEEEEE",
                    borderRadius: "50px",
                    p: { xs: 0.5, md: 1 },
                    width: { xs: "100%", md: "auto" },
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: { xs: 0.5, md: 0 },
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
                            px: { xs: 2, md: 3 },
                            py: { xs: 0.5, md: 1 },
                            fontSize: { xs: "0.875rem", md: "1rem" },
                            minWidth: { xs: "auto", md: "auto" },
                        }}
                    >
                        {cat.cat_name}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            {/* Product Carousel */}
            <Box sx={{ position: "relative", px: { xs: 0, sm: 2, md: 6 } }}>  {/*  Reduced px on xs to 0 */}
                <Slider {...settings}>
                    {products.map((product) => (
                        <Box key={product._id} sx={{ px: 0 }}>  {/*  No px padding inside slide */}
                            <Card
                                sx={{
                                    borderRadius: "16px",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                                    mx: { xs: 1, md: 0.3 },  //  Small margin on xs for centering
                                }}
                            >
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <CardMedia
                                        component="img"
                                        image={product.images[0]}
                                        alt={product.name}
                                        sx={{ 
                                            height: { xs: 150, md: 200 }, 
                                            objectFit: "contain", 
                                            p: { xs: 1, md: 2 },
                                            bgcolor: "#F7F7F7" 
                                        }}
                                    />
                                </Box>
                            
                                <CardContent sx={{ textAlign: "left", p: { xs: 1.5, md: "default" } }}>  {/*  Less padding on xs */}
                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}>
                                        {product.cat_name}
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
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
                                        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: "1.125rem", md: "1.5rem" } }}>
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
                    mt: { xs: 2, md: 4 },
                    textTransform: "none",
                    color: "orange",
                    fontWeight: "bold",
                    fontSize: { xs: "0.875rem", md: "1rem" },
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