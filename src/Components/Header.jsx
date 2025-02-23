import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaMagnifyingGlass } from "react-icons/fa6";

export const Header = () => {
  return (<>
    <nav className="navbar">
      <div className="sidebar">
        <RxHamburgerMenu color="white" />
      </div>
      <div className="name">TrolleyGo</div>
      
        <input type="text" placeholder="Search" className="searchbar" />
        <button className="searchbutton" >
          <FaMagnifyingGlass />
        </button>
      
      <div className="cart">
        <IoCartOutline color="white" />
       
      </div>
      
    </nav>
    
    </>
  );
};
