import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  Button,
  Collapse,
} from "@mui/material";
import { useState } from "react";
function OrderCard({order}){


      const [expandedOrder, setExpandedOrder] = useState(null);

     const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  const AcceptOrder = (orderId) => {
      
  }
    const statusColors = {
  accepted: "success",
  canceled: "error",
  pending: "warning",
};
    return(
        <Grid item xs={12} key={order.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent>
                {/* Order Header */}
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                  spacing={2}
                >
                  <Grid item xs={12} md={3}>
                    <Typography>
                      Order ID:{" "}
                      <Typography
                        component="span"
                        fontWeight="bold"
                        color="primary"
                      >
                        #{order.id}
                      </Typography>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Typography variant="body2">
                      Order Date: {order.date}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <Chip
                      label={order.status}
                      color={statusColors[order.status]}
                      size="small"
                      sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                    />
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <Typography fontWeight="bold">
                      Total: ${order.total}
                    </Typography>
                  </Grid>

                  {order.status === "pending" && <Grid item xs={12} md={2}>
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      onClick={() => AcceptOrder(order.id)}
                    >
                      accepte order
                    </Button>
                  </Grid>}
                </Grid>
                    <Grid item xs={12} md={2}>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => toggleExpand(order.id)}
                        >
                            {expandedOrder === order.id ? "Hide Details" : "View Details"}
                        </Button>
                    </Grid>
                <Divider />

                {/* Product List (collapsible) */}
                <Collapse in={expandedOrder === order.id}>
                  <Box mt={2}>
                    {order.products.map((product, index) => (
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        key={index}
                        sx={{
                          mb: 2,
                          pb: 2,
                          borderBottom:
                            index !== order.products.length - 1
                              ? "1px solid #eee"
                              : "none",
                        }}
                      >
                        <Grid item>
                          <img
                            src={product.image}
                            alt={product.name}
                            width={70}
                            style={{ borderRadius: 8 }}
                          />
                        </Grid>
                        <Grid item xs>
                          <Typography fontWeight="bold">
                            {product.name}
                          </Typography>
                          <Typography variant="body2">
                            Qty: {product.qty}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
    )
}

export default OrderCard