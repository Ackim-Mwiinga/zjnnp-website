const Article = require('../models/Article');

// Get published articles
const getPublishedArticles = async (req, res) => {
  try {
    const { category } = req.query;
    let query = { publishedAt: { $ne: null } };

    if (category) {
      query.category = category;
    }

    const articles = await Article.find(query)
      .sort({ publishedAt: -1 })
      .populate('author', 'username email');
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get article by ID
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    res.json(article);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Article not found' });
    }

    res.status(500).send('Server Error');
  }
};

module.exports = {
  getPublishedArticles,
  getArticleById,
};
