// models/incident.js
const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["Harassment", "Discrimination", "Assault", "Other"],
      default: "Other",
    },
    location: { type: String, default: "Not specified" },
    imageUrl: { type: String, default: null },
    paid: { type: Boolean, default: false }, // ✅ new field
  },
  { timestamps: true }
);

module.exports = mongoose.model("Incident", IncidentSchema);
