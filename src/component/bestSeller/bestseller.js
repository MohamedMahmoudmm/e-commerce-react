import React from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
    const [category, setCategory] = React.useState("Chair");

    const handleCategoryChange = (event, newCategory) => {
        if (newCategory) setCategory(newCategory);
    };

    const products = [
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
                Best Selling Product
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
                {["Chair", "Beds", "Sofa", "Lamp"].map((cat) => (
                    <ToggleButton
                        key={cat}
                        value={cat}
                        sx={{
                            textTransform: "none",
                            border: "none",
                            borderRadius: "50px !important",
                            px: 3,
                        }}
                    >
                        {cat}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            {/* Product Carousel */}
            <Box sx={{ position: "relative", px: 6}}>
                <Slider {...settings}>
                    {products.map((product) => (
                        <Box key={product.id} px={1} >
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
                                    image={product.image}
                                    alt={product.name}
                                    sx={{ height: 200, objectFit: "contain", p: 2 ,bgcolor: "#F7F7F7" }}
                                />
                                    </Box>
                                
                                <CardContent sx={{ textAlign: "left" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.category}
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
                sx={{
                    mt: 4,
                    textTransform: "none",
                    color: "orange",
                    fontWeight: "bold",
                }}
            >
                View All →
            </Button>
        </Box>
    );
}
