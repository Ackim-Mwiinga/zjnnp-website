import express from "express";
const router = express.Router();
import Manuscript from "../models/Manuscript.js";
import { authenticate } from "./../middleware/authMiddleware.js";
import nodemailer from "nodemailer";
import User from "../models/User.js";

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Submit manuscript
router.post("/submit", authenticate, async (req, res) => {
  const { title, abstract, keywords } = req.body;
  const file = req.files.file;
  const filePath = `uploads/${Date.now()}_${file.name}`;
  await file.mv(filePath);

  const manuscript = await Manuscript.create({
    title,
    abstract,
    keywords: keywords.split(","),
    file: filePath,
    author: req.user.id,
  });

  // Notify editors (demo only: send to a static email)
  await transporter.sendMail({
    to: "editor@example.com",
    subject: "New Manuscript Submitted",
    text: `A new manuscript titled "${title}" was submitted.`,
  });

  res.status(201).json(manuscript);
});

// Get manuscripts (editor/reviewer dashboard)
router.get("/all", authenticate, async (req, res) => {
  const user = await User.findById(req.user.id);
  let manuscripts;

  if (user.role === "editor") {
    manuscripts = await Manuscript.find({ assignedEditor: user._id });
  } else if (user.role === "reviewer") {
    manuscripts = await Manuscript.find({ reviewers: user._id });
  } else {
    manuscripts = await Manuscript.find({ author: user._id });
  }

  res.json(manuscripts);
});

// Assign editor/reviewers (admin/editor only)
router.post("/assign", authenticate, async (req, res) => {
  const { manuscriptId, editorId, reviewerIds } = req.body;
  const manuscript = await Manuscript.findByIdAndUpdate(manuscriptId, {
    assignedEditor: editorId,
    reviewers: reviewerIds,
    status: "in review",
  }, { new: true });

  res.json(manuscript);
});

// Submit review (reviewers)
router.post("/review", authenticate, async (req, res) => {
  const { manuscriptId, comments, decision } = req.body;
  const manuscript = await Manuscript.findById(manuscriptId);
  manuscript.reviews.push({ reviewer: req.user.id, comments, decision });
  await manuscript.save();
  res.json(manuscript);
});

export default router;
