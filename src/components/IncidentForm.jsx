// src/components/IncidentForm.jsx
import { useState } from "react";
import axios from "axios";

export default function IncidentForm({ onIncidentCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/incidents",
        { title, description, category, location },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // reset
      setTitle("");
      setDescription("");
      setCategory("Other");
      setLocation("");

      if (onIncidentCreated) onIncidentCreated();
    } catch (err) {
      alert("Failed to submit incident");
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="border p-2 rounded"
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 rounded"
        placeholder="Description"
        value={description}
        required
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button className="bg-purple-700 text-white p-2 rounded">
        Report Incident
      </button>
    </form>
  );
}
