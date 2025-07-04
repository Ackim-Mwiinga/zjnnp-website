const mongoose = require('mongoose');
require('dotenv').config();

const Article = require('./backend/models/Article');

mongoose.connect(process.env.DB_URI)
  .then(async () => {
    await Article.deleteMany({});

    await Article.insertMany([
      {
        title: "Advances in Pediatric Neurosurgery",
        authors: "Dr. A. Mwansa et al.",
        volume: "Vol 12",
        issue: "No 1",
        publishedDate: new Date("2025-05-10"),
        fullTextUrl: "/articles/123",
        abstract: "This study explores the latest surgical techniques in pediatric neurosurgery...",
        featured: true,
        topics: ["Neurosurgery", "Pediatrics"],
      },
      
      {
        title: "New Treatment Modalities for Epilepsy",
        authors: "Dr. B. Ngandu et al.",
        volume: "Vol 12",
        issue: "No 2",
        publishedDate: new Date("2025-06-15"),
        fullTextUrl: "/articles/124",
        abstract: "A comprehensive review of novel therapeutic approaches for epilepsy management...",
        featured: false,
        topics: ["Neurology", "Epilepsy"],
      },
      {
        title: "The Role of Neuroimaging in Stroke Diagnosis",
        authors: "Dr. C. Phiri et al.",
        volume: "Vol 13",
        issue: "No 1",
        publishedDate: new Date("2025-07-20"),
        fullTextUrl: "/articles/125",
        abstract: "An analysis of the utility of various neuroimaging techniques in the acute stroke setting...",
        featured: true,
        topics: ["Neurology", "Stroke", "Neuroimaging"],
      },
    ]);

    console.log("Seed data inserted");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
