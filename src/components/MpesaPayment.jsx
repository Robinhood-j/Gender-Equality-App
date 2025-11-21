// src/components/MpesaPayment.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function MpesaPayment() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all payments from mock backend
  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payment");
      setPayments(res.data);
    } catch (err) {
      console.error("Failed to fetch payments", err.response || err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Submit a new payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !amount) return alert("Phone and amount are required");

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/payment/stkpush", {
        phone,
        amount,
      });

      alert(res.data.message);
      setPhone("");
      setAmount("");

      // Refresh payments list
      fetchPayments();
    } catch (err) {
      console.error("Payment failed", err.response || err);
      alert(err.response?.data?.error || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  // Confirm a payment
  const handleConfirm = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/payment/confirm/${id}`);
      alert(res.data.message);
      fetchPayments();
    } catch (err) {
      console.error("Confirm failed", err.response || err);
      alert(err.response?.data?.error || "Confirm failed");
    }
  };

  return (
    <div className="mpesa-payment" style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Simulated Mpesa Payment</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>

      <h3>All Payments</h3>
      {payments.length === 0 && <p>No payments yet.</p>}
      {payments.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 8,
            borderRadius: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p><strong>Phone:</strong> {p.phone}</p>
            <p><strong>Amount:</strong> {p.amount}</p>
            <p><strong>Status:</strong> {p.status}</p>
            {p.completedAt && <p><small>Completed: {new Date(p.completedAt).toLocaleString()}</small></p>}
          </div>
          {p.status === "Pending" && (
            <button onClick={() => handleConfirm(p.id)}>Confirm</button>
          )}
        </div>
      ))}
    </div>
  );
}
