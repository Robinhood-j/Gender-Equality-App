const express = require("express");
const router = express.Router();
const Incident = require("../models/incident");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * ---------------------------------------------------------
 * POST: Report an Incident
 * ---------------------------------------------------------
 * Creates a new incident tied to the logged-in user
 * (No image upload for now)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const incident = new Incident({
      title,
      description,
      category: category || "Other",
      location: location || "Not specified",
      user: req.user.id,
      imageUrl: null, 
    });

    await incident.save();

    res.status(201).json({
      message: "Incident reported successfully!",
      incident,
    });
  } catch (error) {
    console.error("Error reporting incident:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ---------------------------------------------------------
 * GET: Fetch Incidents for Logged-In User ONLY
 * ---------------------------------------------------------
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const incidents = await Incident.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(incidents);
  } catch (error) {
    console.error("Error fetching incidents:", error);
    res.status(500).json({ message: "Error fetching incidents" });
  }
});

/**
 * ---------------------------------------------------------
 * GET: Single Incident by ID
 * ---------------------------------------------------------
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    // Optional: block access to other people's incidents
    if (String(incident.user) !== String(req.user.id) && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to view this incident" });
    }

    res.json(incident);
  } catch (error) {
    console.error("Error fetching incident:", error);
    res.status(500).json({ message: "Error fetching incident" });
  }
});

/**
 * ---------------------------------------------------------
 * DELETE: Delete Incident
 * Only owner or admin can delete
 * ---------------------------------------------------------
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    const requesterId = req.user.id;
    const isAdmin = req.user.isAdmin || false;

    // Permission check
    if (!isAdmin && String(incident.user) !== String(requesterId)) {
      return res.status(403).json({
        message: "Forbidden: You cannot delete this incident",
      });
    }

    await incident.deleteOne();
    res.json({ message: "Incident deleted successfully" });
  } catch (error) {
    console.error("Error deleting incident:", error);
    res.status(500).json({ message: "Error deleting incident" });
  }
});

module.exports = router;
