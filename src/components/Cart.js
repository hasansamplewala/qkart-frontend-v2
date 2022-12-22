import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart 
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */

export const generateCartItemsFrom = (cartData, productsData) => {
  const CartItems = []
 for(let cartItem of cartData){
  for(let productItem of productsData){
      if(cartItem.productId === productItem._id){
        CartItems.push({
          'name': productItem.name,
          'qty': cartItem.qty,
          'category': productItem.category,
          'cost':productItem.cost,
          'image': productItem.image,
          'rating': productItem.rating,
          'productId': productItem._id
        })
      }
    }
 }
//  console.log('CartItems', CartItems)
 return CartItems
};

// const filteredArray = array1.filter(value => array2.includes(value));
/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  const totalSum = items.reduce(
    (acc, item)=>{
      return acc + (item.cost*item.qty)
    }, 0
  )
  
  return totalSum
};


/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * 
 */
const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete,
}) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};


/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
 * 
 */
          // 'name': productItem.name,
          // 'qty': cartItem.qty,
          // 'category': productItem.category,
          // 'cost':productItem.cost,
          // 'image': productItem.image,
          // 'rating': productItem.rating,
          // 'productId': productItem._id
const CartProductCard =(props)=> {
  return (
<Box display="flex" alignItems="flex-start" padding="1rem">
    <Box className="image-container">
        <img
            // Add product image
            src={props.image}
            // Add product name as alt eext
            alt={props.name}
            width="100%"
            height="100%"
        />
    </Box>
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="6rem"
        paddingX="1rem"
    >
        <div>{props.name}</div>
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >
        <ItemQuantity
        // Add required props by checking implementation
        value={props.qty}
        handleAdd={
           async ()=>{
    await props.addToCart(
    localStorage.getItem('token'),
    props.items,
    props.products,
    props.id,
    props.qty + 1,
    false
            )
          }
        }
        handleDelete={
          async ()=>{
    await props.addToCart(
    localStorage.getItem('token'),
    props.items,
    props.products,
    props.id,
    props.qty - 1,
    false
            )
          }
        }
        />
        <Box padding="0.5rem" fontWeight="700">
            ${props.cost}
        </Box>
        </Box>
    </Box>
</Box>
  )
}

const Cart = ({
  products,
  items = [],
  handleQuantity
}) => {
  const history = useHistory()
  const userToken = localStorage.getItem('token')
  // console.log('products', products, 'items', items)
 if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        {
          items.map(
            item => <CartProductCard addToCart={handleQuantity} items={items} products={products} key={item.productId} id={item.productId} name={item.name} image={item.image} qty={item.qty} cost={item.cost}/>
          )        
        }
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" className="cart-footer">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn"
            onClick={()=>{
              history.push("/checkout", { from: "Cart" })
            }}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Cart;


// curl 'http://localhost:8082/api/v1/cart' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJUZXN0IiwiaWF0IjoxNjcxNjUzOTY2LCJleHAiOjE2NzE2NzU1NjZ9.nAMThGgN3mc3fWPcqZugzoMVa7tFHQSps0bvVwDlwJY'

// curl 'http://localhost:8082/api/v1/cart' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJUZXN0IiwiaWF0IjoxNjcxNjU3MTQ1LCJleHAiOjE2NzE2Nzg3NDV9.W9Zguqt0SRtqhKd2PHa0IPwfkSXX2B-JRreAImDMVsE' -H 'Content-Type: application/json' --data-raw '{"productId":"TwMM4OAhmK0VQ93S","qty":7}'

// curl 'http://localhost:8082/api/v1/cart' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJUZXN0IiwiaWF0IjoxNjcxNTM1NTM4LCJleHAiOjE2NzE1NTcxMzh9.CSfPNCwOwWzKcwQ2VAnAnIwZxBaGTNoN2IL8sjOz4lw' -H 'Content-Type: application/json' --data-raw '{"productId":"KCRwjF7lN97HnEaY","qty":3}' 

// curl 'http://3.6.118.215:8082/api/v1/products'