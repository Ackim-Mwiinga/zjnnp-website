import express from 'express';
const router = express.Router();
import Article from '../models/Article.js';

// GET /api/articles - with filters and pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, pageSize = 10, year, topic, author, keyword } = req.query;
    const filters = {};

    if (year) {
      const start = new Date(`${year}-01-01`);
      const end = new Date(`${year}-12-31`);
      filters.publishedDate = { $gte: start, $lte: end };
    }

    if (topic) {
      filters.topics = topic;
    }

    if (author) {
      filters.authors = { $regex: author, $options: "i" };
    }

    if (keyword) {
      filters.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { abstract: { $regex: keyword, $options: "i" } },
      ];
    }

    const skip = (page - 1) * pageSize;
    const total = await Article.countDocuments(filters);
    const articles = await Article.find(filters)
      .sort({ publishedDate: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(pageSize));

    res.json({ articles, total, page: Number(page), pageSize: Number(pageSize) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/articles/featured
router.get('/featured', async (req, res) => {
  try {
    const featuredArticles = await Article.find({ featured: true }).sort({ publishedDate: -1 }).limit(5);
    res.json({ articles: featuredArticles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/issues
router.get('/issues', async (req, res) => {
  try {
    const years = await Article.aggregate([
      { $group: { _id: { $year: "$publishedDate" } } },
      { $sort: { "_id": -1 } }
    ]);
    const issues = years.map(y => ({ year: y._id }));
    res.json({ issues });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
