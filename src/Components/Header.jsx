import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import "./Header.css";
import TrolleyGoLogo from "C:/Users/Amit/Documents/GroceryTG/src/Images/TrolleyGoLogo.png"; // Ensure the correct path

export const Header = ({ updateValue }) => {
  return (
    <nav className="navbar">
      <button className="menu-button" onClick={() => updateValue(true)}>
        <RxHamburgerMenu className="menu-icon" />
      </button>
      
      <div className="logo-container">
        <img className="logo" src={TrolleyGoLogo} alt="TrolleyGo Logo" />
      </div>
      
      <div className="search-container">
        <input type="text" placeholder="Search for products..." className="search-input" />
        <button className="search-button">
          <FaSearch />
        </button>
      </div>
      
      <div className="cart-container">
        <IoCartOutline className="cart-icon" />
      </div>
    </nav>
  );
};
