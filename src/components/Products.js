import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Cart, {generateCartItemsFrom} from "./Cart";
import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard";
import "./Products.css";

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
 * http://13.127.89.97:8082/api/v1/products
 */

const Products = () => {
  const { enqueueSnackbar } = useSnackbar();
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": a,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const URL = config.endpoint + "/products";
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([])

  const userToken = localStorage.getItem("token");
  const performAPICall = async (url) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setIsLoading(false);
      // console.log('performAPICall', response.data);
      setProducts(response.data);
      setAllProducts(response.data)
      return response.data
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log("A");
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log("B");
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }

      console.log(error.config);
    }
  };

  useEffect(() => {
    const onLoadHandler = async()=>{
      const allProductsData = await performAPICall(URL);
      const cartData = await fetchCart(userToken)
      setCartItems(cartData)
   }
        onLoadHandler()
        // console.log('Running useEffect')
  }, []);

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(false);


  const performSearch = async (text) => {
    try {
      // console.log("text", text);
      const response = await axios.get(URL + "/search?value=" + text);
      // console.log("response", response.data);
      setError(false);
      setProducts(response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        setError(true);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const [debounceTimer, setDebounceTimer] = useState(0);
  const debounceSearch = (event, debounceTimeout) => {
    setSearchText(event);
    if (debounceTimer !== 0) {
      clearTimeout(debounceTimer);
    }
    const newTimer = setTimeout(() => {
      performSearch(event);
    }, 500);

    setDebounceTimer(newTimer);
  };

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
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */
  
  const fetchCart = async (token) => {
    if (!token) return;

    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
      console.log(`fetching cart data with token - Bearer + ${token}` )
      const response = await axios.get(config.endpoint + '/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
console.log('Cart-Data', response.data)

return response.data
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };


  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {
    // for(let item of items){
    //   console.log('Cart item values', Object.values(item), 'checking with productId', productId, Object.values(item).includes(productId))
    // }

    for(let item of items){
      if(Object.values(item).includes(productId)){
              return true
      } 
      console.log('Cart item values', Object.values(item), 'checking with productId', productId, Object.values(item).includes(productId))
    }
    return false
  };

  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options
  ) => {
let data = {}
let itemIsInCartFlag = true
console.log('handle add to cart',
token, 
items,
products,
productId,
qty,
options )
if(userToken === null){
      enqueueSnackbar(
        "Login to add an item to the Cart",
        {
          variant: "error",
        }
      );
      return null
    }
    
if(isItemInCart(cartItems, productId)){
  itemIsInCartFlag = true
    } else  {
      itemIsInCartFlag = false
    }

if(options && !itemIsInCartFlag){
      data = {
        "productId": productId,
        "qty": 1
      }
      postcartItem(data)
      return null
    } 
if(options && itemIsInCartFlag){
    enqueueSnackbar(
      "Item already in cart. Use the cart sidebar to update quantity or remove item.",
      {
        variant: "error",
      }
    );  
    return null
}
if(!options){
  console.log(
  localStorage.getItem('token'),
  items,
  products,
  productId,
  qty)
  data = {
    "productId": productId,
    "qty": qty
  }
  postcartItem(data)
}


async function postcartItem(postData){
  try{
    const response = await axios.post(config.endpoint + '/cart', postData,
    {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }
    )
  console.log('Response for add to cart post request',response)
  setCartItems(response.data)
  // fetchCart(userToken)
  }catch (e) {
    if (e.response && e.response.status === 400) {
      enqueueSnackbar(e.response.data.message, { variant: "error" });
    } else {
      enqueueSnackbar(
        "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
        {
          variant: "error",
        }
      );
    }
    return null;
  }
}
  };


  return (
    <div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <TextField
          className="search-desktop"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          onChange={(event) => {
            debounceSearch(event.target.value, debounceTimer);
          }}
          value={searchText}
          placeholder="Search for items/categories"
          name="search"
        />
      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        onChange={(event) => {
          debounceSearch(event.target.value, debounceTimer);
        }}
        value={searchText}
        placeholder="Search for items/categories"
        name="search"
      />

      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item sm={12} md={9}>
        <Grid item md={12} className="product-grid">
          <Box className="hero">
            <p className="hero-heading">
              India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
              to your door step
            </p>
          </Box>
        </Grid>


        <Grid item md={12}>
          <Grid container spacing={2}>
            {isLoading ? (
              <Box className="loading" sx={{ display: "flex" }}>
                <CircularProgress />
                <br />
                <p>Loading Products</p>
              </Box>
            ) : error ? (
              <Grid className="loading" item xs={12} md={12}>
                
                <SentimentDissatisfied />
                <br />
                <p>No products found</p>
              </Grid>
            ) : (
              products.map((product) => (
                <Grid key={product._id} item xs={6} md={3}>
                  <ProductCard product={product} handleAddToCart={addToCart} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
        </Grid>

        {userToken !== null && (
          <Grid item sm={12} md={3}>
            {/* {console.log('Rendering Cart')} */}
            <Cart isReadOnly={false} products={allProducts} items={generateCartItemsFrom(cartItems, allProducts)} handleQuantity={addToCart}/>
          </Grid>
        )}

      </Grid>
      <Footer />
    </div>
  );
};

export default Products;

// 
