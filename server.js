const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Load dataset correctly! 🛠️
const datasetPath = path.join(__dirname, "items.db.json");
let dataset = JSON.parse(fs.readFileSync(datasetPath, "utf8")).items; // Extract items array!

// 📜 GET all data (with filtering!)
app.get("/api/data", (req, res) => {
  let filteredData = [...dataset]; // Clone the dataset for filtering

  // 🔍 Filter by name (partial match, case-insensitive)
  if (req.query.name) {
    const searchName = req.query.name.toLowerCase();
    filteredData = filteredData.filter((item) =>
      item.name.toLowerCase().includes(searchName)
    );
  }

  // 🔍 Filter by type (exact match)
  if (req.query.type) {
    filteredData = filteredData.filter((item) => item.type === req.query.type);
  }

  // 🔍 Filter by rarity (exact match)
  if (req.query.rarity) {
    filteredData = filteredData.filter(
      (item) => item.rarity === req.query.rarity
    );
  }

  // 🔍 Filter by tag (allows multiple tags, must match at least one)
  if (req.query.tag) {
    const tags = req.query.tag.split(","); // Allow multiple tags in query
    filteredData = filteredData.filter((item) =>
      item.tags.some((tag) => tags.includes(tag))
    );
  }

  // 🔍 Filter by price range (min & max)
  if (req.query.minPrice) {
    filteredData = filteredData.filter(
      (item) => item.price >= Number(req.query.minPrice)
    );
  }
  if (req.query.maxPrice) {
    filteredData = filteredData.filter(
      (item) => item.price <= Number(req.query.maxPrice)
    );
  }

  // Return the filtered results
  res.json(filteredData);
});

// 🎯 GET specific item by ID
app.get("/api/data/:id", (req, res) => {
  const item = dataset.find((d) => d.id == req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(item);
});

// 🎉 Start server
app.listen(PORT, () => {
  console.log(`🐉 REST server running at http://localhost:${PORT}/api/data`);
});
