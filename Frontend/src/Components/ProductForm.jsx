import React from "react";

export const ProductForm = ({ formData, handleChange, handleFileChange, handleSubmit, setShowForm, isEditing, categories }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isEditing ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit} className="product-form">
          
          <div className="form-group">
            <label>Name:</label>
            <div><input type="text" name="name" value={formData.name} onChange={handleChange} required /></div>
          </div>

          <div className="form-group">
            <label>Category:</label>
            <div>
              <select name="category_id" value={formData.category_id} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>{category.category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Buying Price:</label>
            <div><input type="number" name="buying_price" value={formData.buying_price} onChange={handleChange} required /></div>
          </div>

          <div className="form-group">
            <label>Selling Price:</label>
            <div><input type="number" name="selling_price" value={formData.selling_price} onChange={handleChange} required /></div>
          </div>

          <div className="form-group">
            <label>Profit:</label>
            <div><input type="number" name="profit" value={formData.profit} onChange={handleChange} required /></div>
          </div>

          <div className="form-group">
            <label>Image:</label>
            <div><input type="file" name="image" onChange={handleFileChange} /></div>
          </div>

          <div className="form-buttons">
            <button type="submit">{isEditing ? "Update Product" : "Add Product"}</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>

        </form>
      </div>
    </div>
  );
};
