import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { MdHistory } from "react-icons/md";
import { FaShoppingCart, FaHome, FaUserCircle } from "react-icons/fa";
import "../Styles/Sidebar.css";

export const Sidebar = ({ value, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarFullyOpen, setIsSidebarFullyOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "User";
    setUsername(storedUsername);
    if (!value) setIsSidebarFullyOpen(false);
  }, [value]);

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  function handleHistory() {
    navigate("/user/history");
    onClose();
  }

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <div className={`overlay ${value ? "open" : ""}`} onClick={onClose}></div>
      <div
        className={`sidebarbase ${value ? "open" : ""}`}
        onTransitionEnd={() => {
          if (value) setIsSidebarFullyOpen(true);
        }}
      >
        {isSidebarFullyOpen && (
          <>
            {/* Welcome Section with Profile Icon */}
            <div className="Welcome">
              <FaUserCircle className="profile-icon" />
              <span className="username">{username}</span>
            </div>

            <div className="sidebar-content">
              {!isAdmin && (
                <>
                  <div className="dashboard" onClick={() => { navigate("/user"); onClose(); }}>
                    <FaHome /> Home
                  </div>
                  <div className="history" onClick={handleHistory}>
                    <MdHistory /> History
                  </div>
                  <div className="orders" onClick={() => { navigate("/user/cart"); onClose(); }}>
                    <FaShoppingCart /> Orders
                  </div>
                </>
              )}
            </div>

            {/* Logout button */}
            <div className="logout" onClick={handleLogout}>
              <CiLogout />
              <span>Logout</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};
