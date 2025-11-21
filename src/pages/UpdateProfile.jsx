// src/pages/UpdateProfile.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function UpdateProfile() {
  const { user, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Initialize form when user loads
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const updatedFields = { name: form.name, email: form.email };
    if (form.password.trim()) {
      updatedFields.password = form.password;
    }

    try {
      await updateProfile(updatedFields);
      setMsg("Profile updated successfully!");
      setForm({ ...form, password: "" }); // clear password field
    } catch (err) {
      console.error(err);
      setMsg("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Loading user info...</p>;

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

      {msg && <p className="mb-4 text-purple-700">{msg}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <label className="font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <label className="font-medium">New Password (leave blank to keep current)</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter new password"
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
