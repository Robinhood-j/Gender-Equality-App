// src/components/IncidentForm.jsx
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function IncidentForm({ onIncidentCreated }) {
  const { user } = useContext(AuthContext); // user info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description are required");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // 1️⃣ Create incident
      const res = await axios.post(
        "http://localhost:5000/api/incidents",
        { title, description, category, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const incident = res.data.incident;

      // 2️⃣ Simulate payment
      await axios.post(
        "http://localhost:5000/api/payment/pay",
        {
          phone: "254700000000",       // mock phone
          amount: 10,                  // mock amount in KES
          accountRef: "INC123",        // mock reference
          transactionDesc: "Incident payment",
          incidentId: incident._id,    // mark incident as paid
        }
      );

      // 3️⃣ Reset form
      setTitle("");
      setDescription("");
      setCategory("Other");
      setLocation("");

      alert("Incident submitted and payment simulated successfully!");

      // 4️⃣ Notify parent to refresh list
      if (onIncidentCreated) onIncidentCreated();

    } catch (err) {
      console.error("Error submitting incident or payment:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to submit incident/payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Harassment">Harassment</option>
        <option value="Discrimination">Discrimination</option>
        <option value="Assault">Assault</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Report Incident & Pay"}
      </button>
    </form>
  );
}
