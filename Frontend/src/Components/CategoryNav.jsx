import React, { useRef } from "react";
import "../Styles/CategoryNav.css";

export const CategoryNav = ({ categoryRefs }) => {
  const navRef = useRef(null); // Ref for category nav scrolling

  const handleScroll = (category) => {
    if (categoryRefs[category] && categoryRefs[category].current) {
      const element = categoryRefs[category].current;
      const yOffset = -20 * window.innerHeight / 100; // Offset by 10vh to stop scrolling above category
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollNav = (direction) => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: direction * 200, behavior: "smooth" });
    }
  };

  const categories = Object.keys(categoryRefs);
  const showArrows = categories.length > 3; // Show arrows only if categories overflow

  return (
    <div className="category-nav-wrapper">
      {showArrows && <button className="scroll-btn left" onClick={() => scrollNav(-1)}>{"<"}</button>}
      <div className="mainCatnav" ref={navRef}>
        {categories.map((category) => (
          <button key={category} onClick={() => handleScroll(category)} className="cat-button">
            {category}
          </button>
        ))}
      </div>
      {showArrows && <button className="scroll-btn right" onClick={() => scrollNav(1)}>{">"}</button>}
    </div>
  );
};
