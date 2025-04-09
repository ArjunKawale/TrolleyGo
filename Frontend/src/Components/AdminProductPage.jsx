import React, { useState, useEffect } from "react";
import { ProductForm } from "./ProductForm";

export const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    product_id: null,
    name: "",
    category_id: "",
    buying_price: "",
    selling_price: "",
    profit: "",
    image: null,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/adminview/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));

    fetch("http://127.0.0.1:8000/adminview/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/adminview/products/${productId}/`, { 
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((product) => product.product_id !== productId));
        alert("Product deleted successfully");
      } else {
        alert("Error deleting product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setShowForm(true);
    setFormData({
      product_id: product.product_id,
      name: product.name,
      category_id: product.category_id,
      buying_price: product.buying_price,
      selling_price: product.selling_price,
      profit: product.profit,
      image: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category_id", formData.category_id);
    formDataToSend.append("buying_price", formData.buying_price);
    formDataToSend.append("selling_price", formData.selling_price);
    formDataToSend.append("profit", formData.profit);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const url = formData.product_id
        ? `http://127.0.0.1:8000/adminview/products/${formData.product_id}/`
        : "http://127.0.0.1:8000/adminview/products/";

      const method = formData.product_id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (response.ok) {
        alert(isEditing ? "Product updated successfully" : "Product added successfully");
        setShowForm(false);
        setIsEditing(false);
        setFormData({ product_id: null, name: "", category_id: "", buying_price: "", selling_price: "", profit: "", image: null });

        const updatedProducts = await fetch("http://127.0.0.1:8000/adminview/products/").then((res) => res.json());
        setProducts(updatedProducts);
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="table-container">
        <h2>Product List</h2>
        <button className="add-button" onClick={() => { setShowForm(true); setIsEditing(false); }}>Add New Product</button>

        {showForm && (
          <ProductForm
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            setShowForm={setShowForm}
            isEditing={isEditing}
            categories={categories}
          />
        )}

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Buying Price</th>
              <th>Selling Price</th>
              <th>Profit</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.name}</td>
                <td>{product.category_name}</td>
                <td>${product.buying_price}</td>
                <td>${product.selling_price}</td>
                <td>${product.profit}</td>
                <td><img src={product.image} alt={product.name} width="50" /></td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(product.product_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
