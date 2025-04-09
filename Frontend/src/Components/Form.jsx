import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../Styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";
import { jwtDecode } from "jwt-decode";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const getUserData = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            console.error("No token found. Please log in.");
            return null;
        }

        try {
            const response = await api.get("/api/user/register/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const users = response.data;
                const decoded = jwtDecode(token);
                const userId = decoded.user_id;

                const user = users.find(u => u.id === userId);

                if (user) {
                    localStorage.setItem("user_role", user.role);
                    return user.role;
                } else {
                    console.error("User not found in response.");
                    return null;
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
        return null;
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                localStorage.setItem("username", username);

                const role = await getUserData();

                if (role === true || role === "true") {
                    navigate("/admin");
                } else {
                    navigate("/user");
                }
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page"> {/* Wrapper div */}
            <form onSubmit={handleSubmit} className="form-container">
                <h1>{name}</h1>
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {loading && <LoadingIndicator />}
                <button className="form-button" type="submit">
                    {name}
                </button>
                {method === "login" && (
                    <p className="navigate-text">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                )}
            </form>
        </div>
    );
}

export default Form;
