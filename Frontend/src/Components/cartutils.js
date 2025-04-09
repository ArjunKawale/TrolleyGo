export function getCartFromStorage() {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
}

export function addToCart(productId, cart, setCart) {
  if (!cart.includes(productId)) {
    const updatedCart = [...cart, productId];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log("Cart after adding:", updatedCart);
  }
}

export function removeFromCart(productId, cart, setCart) {
  const updatedCart = cart.filter((id) => id !== productId);
  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  console.log("Cart after removing:", updatedCart);
}

export function toggleCart(productId, cart, setCart) {
  if (cart.includes(productId)) {
    removeFromCart(productId, cart, setCart);
  } else {
    addToCart(productId, cart, setCart);
  }
}

// Function to empty the cart
export function clearCart(setCart) {
  setCart([]); // Clear cart state
  localStorage.removeItem("cart"); // Remove cart from localStorage
  console.log("Cart has been emptied");
}
