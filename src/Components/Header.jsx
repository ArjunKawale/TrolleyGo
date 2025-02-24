import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "./Header.css";

export const Header = (props) => {
  return (
    <>
      <nav className="navbar">
        <button className="actualbutton"  onClick={()=>props.updateValue(true)} >
          <div className="sidebar">
            <RxHamburgerMenu color="white" />
          </div>
        </button >
        <div className="name">TrolleyGo</div>

        <input type="text" placeholder="Search" className="searchbar" />
        <button className="searchbutton">
          <FaMagnifyingGlass />
        </button>

        <div className="cart">
          <IoCartOutline color="white" />
        </div>
      </nav>
    </>
  );
};
