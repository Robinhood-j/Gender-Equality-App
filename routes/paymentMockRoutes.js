// routes/paymentMockRoutes.js
const express = require("express");
const router = express.Router();

// Simulated payment storage (in-memory for demo purposes)
let mockPayments = [];

// ✅ POST: Initiate a payment
router.post("/stkpush", (req, res) => {
  const { phoneNumber, amount } = req.body;

  if (!phoneNumber || !amount) {
    return res.status(400).json({ error: "Phone number and amount are required" });
  }

  // Simulate a payment request
  const payment = {
    id: mockPayments.length + 1,
    phoneNumber,
    amount,
    status: "Pending",
    timestamp: new Date(),
  };

  mockPayments.push(payment);
  setTimeout(() => {
  payment.status = "Completed";
  payment.completedAt = new Date();
  console.log("✅ Payment auto-confirmed:", payment);
}, 5000); // 5 seconds


  console.log("🔹 Payment initiated:", payment);

  res.json({
    message: "Payment request received. Simulated STK push sent.",
    payment,
  });
});

// ✅ GET: Retrieve all mock payments
router.get("/", (req, res) => {
  res.json(mockPayments);
});

// ✅ PATCH: Simulate payment confirmation
router.patch("/confirm/:id", (req, res) => {
  const { id } = req.params;
  const payment = mockPayments.find((p) => p.id === parseInt(id));

  if (!payment) {
    return res.status(404).json({ error: "Payment not found" });
  }

  payment.status = "Completed";
  payment.completedAt = new Date();

  console.log("✅ Payment confirmed:", payment);

  res.json({ message: "Payment confirmed", payment });
});

module.exports = router;
