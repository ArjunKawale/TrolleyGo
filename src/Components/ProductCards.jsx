import React, { useState, useEffect } from "react";
import "./ProductCards.css";
import { IoCartOutline } from "react-icons/io5";

export const ProductCards = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (categories.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {categories.map((category) => (
        <div key={category.category} className="category-container">
          
          <div className="categoryName">{category.category}</div>
          <hr className="divider" />

          <div className="structure">
            {category.products.map((product) => (
              <div key={product.id} className="productcard">
                <img src={product.image} alt={product.name} className="product-image" />

                <div className="productname">{product.name}</div>

                <div className="cardfooter">
                  <div className="productprice">₹{product.price}</div>
                  <div className="addtocarticon">
                    <IoCartOutline />
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
