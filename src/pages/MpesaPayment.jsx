// src/pages/MpesaPayment.jsx
import { useState } from "react";
import axios from "axios";

export default function MpesaPayment() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!phone || !amount) {
      alert("Please enter both phone number and amount");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Call your backend mock route
      const res = await axios.post("http://localhost:5000/api/payment/stkpush", {
        phone,
        amount,
      });

      setMessage(res.data.message || "Payment simulated successfully!");
    } catch (err) {
      console.error("Payment error:", err.response || err);
      setMessage(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: "2rem", border: "1px solid #ccc", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Simulate Mpesa Payment</h2>
      <form onSubmit={handlePayment} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="tel"
          placeholder="Phone number (e.g. 2547XXXXXXXX)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} style={{ padding: "0.6rem", backgroundColor: "#f59e0b", color: "#fff", border: "none", borderRadius: 4 }}>
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>

      {message && <p style={{ marginTop: "1rem", color: "#6b46c1" }}>{message}</p>}
    </div>
  );
}
