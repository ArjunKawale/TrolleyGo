import React, { useEffect, useState } from "react";
import { getCartFromStorage, removeFromCart, clearCart } from "./cartutils";
import "../Styles/CartPage.css";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export const CartPage = () => {
  const [cartState, setCartState] = useState(getCartFromStorage()); // Store cart from localStorage
  const [cartProducts, setCartProducts] = useState([]);
  const [counts, setCounts] = useState({}); // Store quantity per product

  // Retrieve the username from localStorage with a fallback if it's not found
  const username = localStorage.getItem("username") || "Guest";
  console.log("Username from localStorage:", username); // Log to verify

  useEffect(() => {
    if (cartState.length === 0) {
      setCartProducts([]); // Ensure state updates when cart is empty
      return;
    }

    const queryParams = cartState.map((id) => `ids[]=${id}`).join("&");
    const url = `http://127.0.0.1:8000/cart-products/?${queryParams}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCartProducts(data);

        // Initialize counts only if it's empty (to prevent resetting on re-renders)
        setCounts((prevCounts) => {
          const newCounts = { ...prevCounts };
          data.forEach((product) => {
            if (!(product.product_id in newCounts)) {
              newCounts[product.product_id] = 1;
            }
          });
          return newCounts;
        });
      })
      .catch((error) => console.error("Error fetching cart products:", error));
  }, [cartState]); // Depend on cartState

  // Increment function for a specific product
  const increment = (productId) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: prevCounts[productId] + 1,
    }));
  };

  // Decrement function for a specific product
  const decrement = (productId) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.max(1, prevCounts[productId] - 1), // Prevent going below 1
    }));
  };

  // Delete function to remove product from cart
  const deleteProduct = (productId) => {
    removeFromCart(productId, cartState, setCartState); // Remove from localStorage
    setCartProducts((prevProducts) => prevProducts.filter((product) => product.product_id !== productId)); // Remove from displayed cart
  };

  // Calculate total price
  const totalPrice = cartProducts.reduce((total, product) => {
    return total + (counts[product.product_id] || 1) * product.selling_price;
  }, 0);

  // Handle buy button click
  const handleBuy = () => {
    const currentDate = new Date();

    // Get the local date in YYYY-MM-DD format
    const transactionDate = currentDate.toISOString().split("T")[0];

    // Get the local time in HH:mm:ss format
    const transactionTime = currentDate.toLocaleTimeString("en-US", {
        hour12: false, // Use 24-hour format
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    console.log("Transaction username:", username);

    const transactionData = cartProducts.map((product) => {
        const quantity = counts[product.product_id] || 1;
        const totalPrice = quantity * product.selling_price;

        const data = {
            quantity,
            total_price: totalPrice,
            transaction_date: transactionDate,
            transaction_time: transactionTime, // Corrected time format
            product: product.product_id,
            user: username,
        };

        console.log("Transaction Data Sent to Backend:", data);
        return data;
    });

    // Send requests and handle the transaction creation
    transactionData.forEach((data) => {
        fetch("http://127.0.0.1:8000/transactions/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to create transaction");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Transaction created:", data);
        })
        .catch((error) => {
            console.error("Error creating transaction:", error);
        });
    });

    // Clear the cart after successful transaction creation
    clearCart(setCartState);
    setCartProducts([]);
};


  return (
    <div className="cart-page-container">
  <div className="headings">
    <div>Item</div>
    <div>Price</div>
    <div>Quantity</div>
    <div>Subtotal</div>
  </div>
  <hr className="divider" />

  {cartProducts.length === 0 ? (
    <div className="empty-cart">No products in the cart.</div>
  ) : (
    <>
      <div className="holdered">
        {cartProducts.map((product) => (
          <div className="productholder" key={product.product_id}>
            <div className="imgandname">
              <div className="cartimgholder">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="cartproductname">{product.name}</div>
            </div>
            <div className="singleproductprice">₹{product.selling_price}</div>
            <div className="cartproductquantity">
              <div className="decrementbutton" onClick={() => decrement(product.product_id)}>
                <FaMinus />
              </div>
              <div className="quantity">{counts[product.product_id] || 1}</div>
              <div className="incrementbutton" onClick={() => increment(product.product_id)}>
                <FaPlus />
              </div>
            </div>
            <div>
              <div className="subtotal">₹{(counts[product.product_id] || 1) * product.selling_price}</div>
              <div className="deletebutton" onClick={() => deleteProduct(product.product_id)}>
                <MdDelete />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="total-price">
        <div className="cancelButton" onClick={() => clearCart(setCartState)}>Cancel</div>
        <div onClick={handleBuy} className="Buybutton">Buy</div>
        <div className="totalPrice">Total: ₹{totalPrice}</div>
      </div>
    </>
  )}
</div>

  );
};
