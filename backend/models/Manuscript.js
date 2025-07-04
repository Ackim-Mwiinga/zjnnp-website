import mongoose from "mongoose";

const manuscriptSchema = new mongoose.Schema({
  title: String,
  abstract: String,
  keywords: [String],
  file: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["submitted", "in review", "accepted", "rejected"], default: "submitted" },
  assignedEditor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  reviews: [{ reviewer: String, comments: String, decision: String }],
});

export default mongoose.model("Manuscript", manuscriptSchema);
