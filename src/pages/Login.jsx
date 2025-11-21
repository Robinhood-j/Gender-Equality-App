// src/pages/Login.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form.email, form.password);
    if (res.ok) {
      setMsg("Login successful — redirecting...");
      setTimeout(() => navigate("/"), 600);
    } else {
      setMsg(res.error?.error || "Login failed");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 480 }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={onChange} required />
        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={onChange} required />
        <button type="submit">Login</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
