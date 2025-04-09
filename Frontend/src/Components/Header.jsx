import React, { useState, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/Header.css";
import { getCartFromStorage } from "./cartutils";
import LogoImage from "../Images/TrolleyGologo.svg";


export const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [cartLength, setCartLength] = useState(getCartFromStorage().length);


  useEffect(() => {
    const updateCart = () => setCartLength(getCartFromStorage().length);
    const interval = setInterval(updateCart, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      navigate(`/user/search?query=${encodeURIComponent(searchText)}`);
      setSearchText("");
    }
  };

  // Check if the current route is for admin
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <nav className="navbar">
      <button className="actualbutton" onClick={() => props.updateValue(true)}>
        <div className="sidebar">
          <RxHamburgerMenu color="white" />
        </div>
      </button>
      <div onClick={() => navigate(isAdmin ? "/admin" : "/user")}>
        <div className="logoholder">
          <img className="logo" src={LogoImage} alt="" />
        </div>
      </div>

      {/* Only show search bar and cart icon for user routes */}
      {!isAdmin && (
        <>
          <input
            type="text"
            placeholder="Search"
            className="searchbar"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="searchbutton" onClick={handleSearch}>
            <FaMagnifyingGlass />
          </button>
          <div className="cart" onClick={() => navigate("/user/cart")}>
            <IoCartOutline className="actualcart" color="white" />
            {cartLength !== 0 && <div className="no">{cartLength}</div>}
          </div>
        </>
      )}
    </nav>
  );
};
