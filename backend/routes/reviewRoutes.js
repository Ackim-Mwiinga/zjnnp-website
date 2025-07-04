import express from "express";
import Manuscript from "../models/Manuscript.js";
import { authenticate } from "./../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Submit review (reviewers)
router.post("/submit", authenticate, async (req, res) => {
  const { manuscriptId, comments, decision } = req.body;
  const manuscript = await Manuscript.findById(manuscriptId);
  manuscript.reviews.push({ reviewer: req.user.id, comments, decision });
  await manuscript.save();
  res.json(manuscript);
});

export default router;
