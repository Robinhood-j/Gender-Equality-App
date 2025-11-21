const Incident = require("../models/Incident");

// Create new incident
exports.createIncident = async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.status(201).json({ message: "Incident reported successfully", incident });
  } catch (error) {
    res.status(500).json({ error: "Failed to report incident" });
  }
};

// Get all incidents
exports.getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch incidents" });
  }
};

// Get single incident by ID
exports.getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ error: "Incident not found" });
    }
    res.json(incident);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch incident" });
  }
};
// Update an incident
exports.updateIncident = async (req, res) => {
  try {
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // returns updated doc & validates input
    );
    if (!incident) {
      return res.status(404).json({ error: "Incident not found" });
    }
    res.json({ message: "Incident updated successfully", incident });
  } catch (error) {
    res.status(500).json({ error: "Failed to update incident" });
  }
};

// Delete an incident
exports.deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) {
      return res.status(404).json({ error: "Incident not found" });
    }
    res.json({ message: "Incident deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete incident" });
  }
};
