// routes/payment.js
const express = require("express");
const router = express.Router();
const Incident = require("../models/incident");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ MOCK PAYMENT ENDPOINT
router.post("/pay", authMiddleware, async (req, res) => {
  try {
    const { phone, amount, accountRef, transactionDesc, incidentId } = req.body;

    if (!phone || !amount || !incidentId) {
      return res.status(400).json({ message: "Missing required payment fields" });
    }

    // Simulate delay of payment processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mark incident as "paid" in database
    const incident = await Incident.findById(incidentId);
    if (!incident) return res.status(404).json({ message: "Incident not found" });

    incident.paid = true; // add paid field dynamically
    await incident.save();

    res.json({
      message: "Payment simulated successfully",
      incidentId,
      paid: incident.paid,
      phone,
      amount,
      accountRef,
      transactionDesc,
    });
  } catch (err) {
    console.error("❌ Payment simulation failed:", err);
    res.status(500).json({ message: "Payment simulation failed" });
  }
});

module.exports = router;
