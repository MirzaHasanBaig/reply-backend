const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const csvParser = require("csv-parser"); 
const fs = require("fs");
const MyModel = require("../models/Contact"); // Import your Mongoose model

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// POST route to create a new document from CSV
router.post("/create", upload.single("csvFile"), async (req, res) => {
  try {
    // Check if file was uploaded
    console.log(req);
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const csvData = [];
    const predefinedColumns = ['name', 'age', 'email', 'address']; // Define the fields to bind

    // Parse CSV file
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on("data", (row) => {
        // Map CSV columns dynamically to the Mongoose schema
        const mappedData = {};
        predefinedColumns.forEach((col, index) => {
          const columnName = Object.keys(row)[index]; // get the column name from CSV row
          if (columnName && predefinedColumns.includes(col)) {
            mappedData[col] = row[columnName]; // Dynamically bind column to key
          }
        });
        csvData.push(mappedData);
      })
      .on("end", async () => {
        try {
          // Insert mapped data into MongoDB
          await MyModel.insertMany(csvData);
          res.status(200).send({ message: "CSV data imported successfully!" });
        } catch (err) {
          console.error("Error inserting data:", err);
          res.status(500).send({ message: "Error inserting data into MongoDB", error: err });
        }
      })
      .on("error", (err) => {
        res.status(500).send({ message: "Error reading CSV file", error: err });
      });
  } catch (err) {
    console.error("Error during file upload or processing:", err);
    res.status(500).send({ message: "An error occurred", error: err });
  }
});

module.exports = router;
