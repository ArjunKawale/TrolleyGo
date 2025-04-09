import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCartFromStorage, toggleCart } from "./cartutils";
import "../Styles/ProductCards.css";
import "./Jsc.css";

export const SearchPageJS = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const [searchProduct, setSearchProduct] = useState([]);
  const [cart, setCart] = useState(getCartFromStorage());
  const [showJumpscare, setShowJumpscare] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    console.log("Search Query:", searchQuery);

    if (!searchQuery) return;

    if (searchQuery.toLowerCase() === "gun") {
      console.log("Gun detected! Triggering jumpscare.");
      setShowJumpscare(true);
    } else {
      console.log("Fetching products for search:", searchQuery);
      fetch(`http://127.0.0.1:8000/search?query=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Received search results:", data);
          setSearchProduct(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [searchQuery]);

  // Preload jumpscare video
  useEffect(() => {
    const video = document.createElement("video");
    video.src = "/hehe.mp4";
    video.preload = "auto";
    video.oncanplaythrough = () => {
      console.log("Jumpscare video loaded successfully.");
      setVideoLoaded(true);
    };
    video.onerror = () => console.error("Error loading jumpscare video. Check if /hehe.mp4 exists.");
  }, []);

  return (
    <div>
      {showJumpscare ? (
        <div className="jumpscare-overlay">
          {videoLoaded ? (
            <video
              autoPlay
              playsInline
              className="jumpscare-video"
              onEnded={() => {
                console.log("Jumpscare video ended. Redirecting...");
                navigate("/user");
              }}
            >
              <source src="/hehe.mp4" type="video/mp4" />
            </video>
          ) : (
            <div className="loading-text">Redirecting</div>
          )}
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};
