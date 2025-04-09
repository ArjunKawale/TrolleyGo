import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCartFromStorage, toggleCart } from "./cartutils";
import "../Styles/ProductCards.css"; 

export const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query"); // Get search term from URL

  const [searchProduct, setSearchProduct] = useState([]);
  const [cart, setCart] = useState(getCartFromStorage());

  useEffect(() => {
    if (!searchQuery) return;

    fetch(`http://127.0.0.1:8000/search?query=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => setSearchProduct(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [searchQuery]);

  return (
    <div>
      <div className="searchProducttitle">Search Results for: {searchQuery}</div>
      <hr className="divider" />

      <div className="structure">
        {searchProduct.length > 0 ? (
          searchProduct.map((product) => (
            <div key={product.product_id} className="productcard">
              <div className="image-container">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <div className="productname">{product.name}</div>
              <div className="cardfooter">
                <div className="productprice">₹{product.selling_price}</div>
                <div
                  className={`addtocarticon ${cart.includes(product.product_id) ? "added-to-cart" : "add"}`}
                  onClick={() => toggleCart(product.product_id, cart, setCart)}
                >
                  {cart.includes(product.product_id) ? "Added" : "Add"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="noP">No products found.</div>
        )}
      </div>
    </div>
  );
};
