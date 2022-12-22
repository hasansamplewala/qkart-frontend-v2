import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  CardActionArea,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
      <CardMedia component="img" height="140" image={product.image} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          ${product.cost}
        </Typography>
        <Typography  gutterBottom variant="body2" color="text.secondary">
          <Rating aria-label='stars' name="read-only" value={product.rating} readOnly />
        </Typography>
      </CardContent>
      <CardActions>
        <Button aria-label='add to cart' className="button" variant="contained" onClick={()=>{handleAddToCart(null, null, null, product._id, null, true)}}>
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

// {
//   "name":"Tan Leatherette Weekender Duffle",
//   "category":"Fashion",
//   "cost":150,
//   "rating":4,
//   "image":"https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png",
//   "_id":"PmInA797xJhMIPti"
//   }
