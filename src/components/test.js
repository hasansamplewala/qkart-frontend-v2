const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    check = { preventDuplicate: false }
  ) => {
    if (!token) {
      enqueueSnackbar("Login to add an item to the Cart", {
        variant: "warning",
      });
      return;
    }
    if (check.preventDuplicate && isItemInCart(items, productId)) {
      enqueueSnackbar(
        "Item already in Cart.Use the cart sidebar to update quantity or remove item",
        { variant: "warning" }
      );
      return;
    }

    try {
      const url = `${config.endpoint}/cart`;
      const response = await axios.post(
        url,
        { productId, qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const cartItems = generateCartItemsFrom(response.data, products);
      setItems(cartItems);
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        return null;
      } else {
        enqueueSnackbar(
          "Could not fetch products. Check that the backend is running, reachable and returns valid JSON",
          { variant: "error" }
        );
      }
    }
  };