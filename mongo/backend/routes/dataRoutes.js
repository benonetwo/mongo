const express = require("express");
const router = express.Router();
const Data = require("../models/Data");

// Create - Add new data
router.post("/add", async (req, res) => {
  try {
    const { name } = req.body;
    const newData = new Data({ name });
    await newData.save();
    res.status(201).json({ message: "Data added successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Read - Get all data
router.get("/get", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update - Modify existing data
router.put("/update/:id", async (req, res) => {
  try {
    const { name } = req.body;
    await Data.findByIdAndUpdate(req.params.id, { name });
    res.json({ message: "Data updated successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete - Remove data
router.delete("/delete/:id", async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.json({ message: "Data deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
