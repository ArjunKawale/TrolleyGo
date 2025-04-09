import React, { useState, useEffect, useRef } from "react";
import { getCartFromStorage, toggleCart } from "./cartutils"; 
import "../Styles/ProductCards.css";

export const ProductCards = ({ setCategoryRefs }) => {
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState(getCartFromStorage());
  const categoryRefs = useRef({}); // Store category refs

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products/")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        const refs = {};
        data.forEach(category => {
          refs[category.category] = React.createRef();
        });
        categoryRefs.current = refs;
        setCategoryRefs(refs);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [setCategoryRefs]);  // ✅ Now includes setCategoryRefs
  

  if (categories.length === 0) return <p>Loading...</p>;

  return (
    <div>
      {categories.map((category) => (
        <div
          key={category.category}
          ref={categoryRefs.current[category.category]} // Attach ref here
          className="category-container"
        >
          <div className="categoryName">{category.category}</div>
          <hr className="divider" />
          <div className="structure">
            {category.products.map((product) => (
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
