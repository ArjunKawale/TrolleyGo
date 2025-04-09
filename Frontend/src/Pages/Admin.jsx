import React, { useState } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import "../Styles/App.css";
import { Header } from "../Components/Header";
import { Sidebar } from "../Components/Sidebar";
import "../Styles/Admin.css";
import { AdminProductPage } from "../Components/AdminProductPage";
import {AdminCategoryPage} from "../Components/AdminCategoryPage";
import AdminUserdisplayPage  from "../Components/AdminUserdisplayPage";
import { AdminTransactionPage } from "../Components/AdminTransactionPage";

function AdminLayout() {
  const [value, setValue] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  return (
    <>
      <Header updateValue={setValue} />
      <Sidebar value={value} onClose={() => setValue(false)} />
      <div className="admin-container">
        <h1 className="admin-title">Admin Dashboard</h1>
        <div className="tab-buttons">
          <button className="tab-button" onClick={() => navigate("/admin/products")}>Products</button>
          <button className="tab-button" onClick={() => navigate("/admin/categories")}>Categories</button>
          <button className="tab-button" onClick={() => navigate("/admin/users")}>Users</button>
          <button className="tab-button" onClick={() => navigate("/admin/transactions")}>Transactions</button>
        </div>
        <div className="admin-content">
          <Outlet /> {/* Ensure content loads here */}
        </div>
      </div>
    </>
  );
}

function Admin() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminProductPage />} /> {/* Default page */}
        <Route path="products" element={<AdminProductPage />} />
        <Route path="categories" element={<AdminCategoryPage />} />
        <Route path="users" element={<AdminUserdisplayPage />} />
        <Route path="transactions" element={<AdminTransactionPage />} />
      </Route>
    </Routes>
  );
}

export default Admin;
