// src/pages/Register.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
    } catch (err) {
      console.error("❌ Registration failed:", err);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  );
}
