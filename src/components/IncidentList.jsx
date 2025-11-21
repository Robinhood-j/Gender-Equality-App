// src/components/IncidentList.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function IncidentList({ refresh, onDeleted }) {
  const [incidents, setIncidents] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchIncidents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return setIncidents([]);

      const res = await axios.get("http://localhost:5000/api/incidents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncidents(res.data);
    } catch (err) {
      console.error("Failed to fetch incidents", err.response || err);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this incident?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:5000/api/incidents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message || "Deleted");
      fetchIncidents();
      if (onDeleted) onDeleted(id);
    } catch (err) {
      console.error("Failed to delete incident", err.response || err);
      alert(err.response?.data?.message || "Failed to delete incident.");
    }
  };

  return (
    <div>
      <h2>All Reported Incidents</h2>

      {incidents.length === 0 ? (
        <p>No incidents reported yet.</p>
      ) : (
        incidents.map((incident) => {
          const isOwner = user && (String(user._id || user.id) === String(incident.user));
          const canDelete = isOwner || (user && user.isAdmin);

          return (
            <div
              key={incident._id}
              style={{
                border: "1px solid #ccc",
                padding: 12,
                marginBottom: 12,
                borderRadius: 6,
              }}
            >
              <h3>{incident.title}</h3>
              <p>{incident.description}</p>
              <p><strong>Category:</strong> {incident.category}</p>
              <p><strong>Location:</strong> {incident.location || "Not specified"}</p>
              <small>Posted on: {new Date(incident.createdAt).toLocaleString()}</small>

              {/* ✅ Payment status */}
              <p>
                <strong>Payment:</strong>{" "}
                {incident.paid ? "✅ Completed" : "❌ Not Paid"}
              </p>

              {incident.imageUrl && (
                <div style={{ marginTop: 8 }}>
                  <img src={incident.imageUrl} alt="Incident" style={{ maxWidth: "200px", borderRadius: 6 }} />
                </div>
              )}

              {canDelete && (
                <div style={{ marginTop: 10 }}>
                  <button
                    onClick={() => handleDelete(incident._id)}
                    style={{
                      background: "#e53e3e",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
