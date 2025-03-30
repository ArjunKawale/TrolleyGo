import React, { useState, useEffect } from "react";
import "./ProductCards.css";
import { IoCartOutline } from "react-icons/io5";

// Sample Products Data
const categoriesData = [
  { category: "Fruits", products: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Fruit ${i + 1}`, price: (i + 1) * 10, image: "https://via.placeholder.com/200" })) },
  { category: "Vegetables", products: Array.from({ length: 10 }, (_, i) => ({ id: i + 11, name: `Vegetable ${i + 1}`, price: (i + 1) * 12, image: "https://via.placeholder.com/200" })) },
  { category: "Dairy", products: Array.from({ length: 10 }, (_, i) => ({ id: i + 21, name: `Dairy Product ${i + 1}`, price: (i + 1) * 15, image: "https://via.placeholder.com/200" })) },
  { category: "Bakery", products: Array.from({ length: 10 }, (_, i) => ({ id: i + 31, name: `Bakery Item ${i + 1}`, price: (i + 1) * 20, image: "https://via.placeholder.com/200" })) },
  { category: "Beverages", products: Array.from({ length: 10 }, (_, i) => ({ id: i + 41, name: `Beverage ${i + 1}`, price: (i + 1) * 18, image: "https://via.placeholder.com/200" })) },
  { category: "Snacks", products: Array.from({ length: 10 }, (_, i) => ({ id: i + 51, name: `Snack ${i + 1}`, price: (i + 1) * 8, image: "https://via.placeholder.com/200" })) },
  { category: "Frozen Foods", products: Array.from({ length: 10 }, (_, i) => ({ id: i + 61, name: `Frozen Food ${i + 1}`, price: (i + 1) * 22, image: "https://via.placeholder.com/200" })) },
  { category: "Grains", products: Array.from({ length: 10 }, (_, i) => ({ id: i + 71, name: `Grain ${i + 1}`, price: (i + 1) * 9, image: "https://via.placeholder.com/200" })) },
  { category: "Condiments", products: Array.from({ length: 10 }, (_, i) => ({ id: i + 81, name: `Condiment ${i + 1}`, price: (i + 1) * 17, image: "https://via.placeholder.com/200" })) },
  { category: "Personal Care", products: Array.from({ length: 10 }, (_, i) => ({ id: i + 91, name: `Personal Care ${i + 1}`, price: (i + 1) * 19, image: "https://via.placeholder.com/200" })) }
];

export const ProductCards = () => {
  const [categories, setCategories] = useState(categoriesData);

  return (
    <div className="product-page">
      {categories.map((category) => (
        <div key={category.category} className="category-container">
          <div className="categoryName">{category.category}</div>
          <hr className="divider" />

          <div className="structure">
            {category.products.map((product) => (
              <div key={product.id} className="productcard">
                <div className="card-content">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="productname">{product.name}</div>
                  <div className="cardfooter">
                    <div className="productprice">₹{product.price}</div>
                    <button className="addtocarticon" aria-label={`Add ${product.name} to cart`}>
                      <IoCartOutline />
                    </button>
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
