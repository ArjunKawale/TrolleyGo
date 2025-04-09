import React, { useState, useEffect } from "react";

export const AdminCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/adminview/categories/");
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;
        try {
            await fetch("http://127.0.0.1:8000/adminview/categories/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category: newCategory })
            });
            setNewCategory("");
            fetchCategories();
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const handleEditCategory = async () => {
        if (!editingCategory || !editingCategory.category.trim()) return;
        try {
            await fetch(`http://127.0.0.1:8000/adminview/categories/${editingCategory.category_id}/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category: editingCategory.category })
            });
            setEditingCategory(null);
            fetchCategories();
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    const handleDeleteCategory = async (category_id) => {
        try {
            await fetch(`http://127.0.0.1:8000/adminview/categories/${category_id}/`, {
                method: "DELETE"
            });
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <div className="admin-container">
            <h2 className="admin-title">Admin Category Management</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="search-box"
                />
                <button onClick={handleAddCategory} className="add-button">Add Category</button>
            </div>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Category ID</th>
                            <th>Category Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.category_id}>
                                <td>{cat.category_id}</td>
                                <td>
                                    {editingCategory?.category_id === cat.category_id ? (
                                        <input
                                            type="text"
                                            value={editingCategory.category}
                                            onChange={(e) =>
                                                setEditingCategory({ ...editingCategory, category: e.target.value })
                                            }
                                            className="search-box"
                                        />
                                    ) : (
                                        cat.category
                                    )}
                                </td>
                                <td>
                                    {editingCategory?.category_id === cat.category_id ? (
                                        <button onClick={handleEditCategory} className="edit-button">Save</button>
                                    ) : (
                                        <button onClick={() => setEditingCategory(cat)} className="edit-button">Edit</button>
                                    )}
                                    <button onClick={() => handleDeleteCategory(cat.category_id)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};