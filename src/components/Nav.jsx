// src/components/Nav.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Nav() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "1rem 2rem",
        background: "#6b46c1",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Link to="/" style={{ marginRight: 20, color: "#fff", textDecoration: "none" }}>
          Home
        </Link>
        {user && (
          <>
            <Link to="/profile" style={{ marginRight: 20, color: "#fff", textDecoration: "none" }}>
              Profile
            </Link>
            <Link to="/update-profile" style={{ marginRight: 20, color: "#fff", textDecoration: "none" }}>
              Update Profile
            </Link>
            <Link to="/payment" style={{ color: "#fff", textDecoration: "none" }}>
              Payment
            </Link>
          </>
        )}
      </div>
      <div>
        {user ? (
          <button onClick={handleLogout} style={{ background: "#e53e3e", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 4 }}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: 10, color: "#fff", textDecoration: "none" }}>Login</Link>
            <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
