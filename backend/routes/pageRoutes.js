const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');

// Import all models
const { Article, Specialty, Resource, Competition, Channel, Partner, AboutContent } = require('../models/PageContent');
const { Bookmark, Notification, SearchTag } = require('../models/UserEngagement');

// Newsroom endpoints
router.get('/newsroom', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (category) query.category = category;
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const [articles, total] = await Promise.all([
      Article.find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author'),
      Article.countDocuments(query)
    ]);

    const categories = await Article.distinct('category');
    const featuredArticles = await Article.find({ featured: true }).sort({ date: -1 }).limit(3);

    res.status(200).json({
      articles,
      categories,
      featured: featuredArticles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalArticles: total
    });
  } catch (error) {
    console.error('Newsroom error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single article
router.get('/newsroom/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author')
      .populate({
        path: 'comments',
        populate: { path: 'author' }
      });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error('Article error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create article (admin only)
router.post('/newsroom', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const { title, content, category, tags, image, featured } = req.body;

    const article = new Article({
      title,
      content,
      category,
      tags,
      image,
      featured,
      author: req.user.id
    });

    await article.save();
    res.status(201).json({ message: 'Article created successfully', article });
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update article (admin only)
router.put('/newsroom/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const { title, content, category, tags, image, featured } = req.body;

    article.title = title;
    article.content = content;
    article.category = category;
    article.tags = tags;
    article.image = image;
    article.featured = featured;

    await article.save();
    res.status(200).json({ message: 'Article updated successfully', article });
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete article (admin only)
router.delete('/newsroom/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// About Us endpoints
router.get('/about', async (req, res) => {
  try {
    const content = await AboutContent.findOne();
    if (!content) {
      return res.status(404).json({ message: 'About content not found' });
    }

    res.status(200).json(content);
  } catch (error) {
    console.error('About error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update About Us content (admin only)
router.put('/about', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const { mission, values, history, team, contactInfo } = req.body;

    let content = await AboutContent.findOne();
    if (!content) {
      content = new AboutContent();
    }

    content.mission = mission;
    content.values = values;
    content.history = history;
    content.team = team;
    content.contactInfo = contactInfo;

    await content.save();
    res.status(200).json({ message: 'About content updated successfully', content });
  } catch (error) {
    console.error('Update about error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Specialties endpoints
router.get('/specialties', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (category) query.category = category;
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const [specialties, total] = await Promise.all([
      Specialty.find(query)
        .sort({ featured: -1, popular: -1 })
        .skip(skip)
        .limit(limit),
      Specialty.countDocuments(query)
    ]);

    const categories = await Specialty.distinct('category');
    const featuredSpecialties = await Specialty.find({ featured: true }).sort({ popular: -1 }).limit(3);
    const popularSpecialties = await Specialty.find({ popular: true }).sort({ featured: -1 }).limit(3);

    res.status(200).json({
      specialties,
      categories,
      featured: featuredSpecialties,
      popular: popularSpecialties,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalSpecialties: total
    });
  } catch (error) {
    console.error('Specialties error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single specialty
router.get('/specialties/:id', async (req, res) => {
  try {
    const specialty = await Specialty.findById(req.params.id);
    if (!specialty) {
      return res.status(404).json({ message: 'Specialty not found' });
    }

    res.status(200).json(specialty);
  } catch (error) {
    console.error('Specialty error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create specialty (admin only)
router.post('/specialties', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const { name, description, category, tags, image, featured, popular } = req.body;

    const specialty = new Specialty({
      name,
      description,
      category,
      tags,
      image,
      featured,
      popular
    });

    await specialty.save();
    res.status(201).json({ message: 'Specialty created successfully', specialty });
  } catch (error) {
    console.error('Create specialty error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update specialty (admin only)
router.put('/specialties/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const specialty = await Specialty.findById(req.params.id);
    if (!specialty) {
      return res.status(404).json({ message: 'Specialty not found' });
    }

    const { name, description, category, tags, image, featured, popular } = req.body;

    specialty.name = name;
    specialty.description = description;
    specialty.category = category;
    specialty.tags = tags;
    specialty.image = image;
    specialty.featured = featured;
    specialty.popular = popular;

    await specialty.save();
    res.status(200).json({ message: 'Specialty updated successfully', specialty });
  } catch (error) {
    console.error('Update specialty error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete specialty (admin only)
router.delete('/specialties/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const specialty = await Specialty.findByIdAndDelete(req.params.id);
    if (!specialty) {
      return res.status(404).json({ message: 'Specialty not found' });
    }

    res.status(200).json({ message: 'Specialty deleted successfully' });
  } catch (error) {
    console.error('Delete specialty error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Resources endpoints
router.get('/resources', async (req, res) => {
  try {
    const { category, type, search, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (category) query.category = category;
    if (type) query.type = type;
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const [resources, total] = await Promise.all([
      Resource.find(query)
        .sort({ dateAdded: -1 })
        .skip(skip)
        .limit(limit),
      Resource.countDocuments(query)
    ]);

    const categories = await Resource.distinct('category');
    const types = await Resource.distinct('type');

    res.status(200).json({
      resources,
      categories,
      types,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalResources: total
    });
  } catch (error) {
    console.error('Resources error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single resource
router.get('/resources/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Add bookmark status if user is authenticated
    if (req.user) {
      const isBookmarked = await Bookmark.findOne({
        userId: req.user.id,
        type: 'resource',
        itemId: req.params.id
      });
      resource.isBookmarked = !!isBookmarked;
    }

    res.status(200).json(resource);
  } catch (error) {
    console.error('Resource error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Toggle bookmark for resource
router.post('/resources/:id/bookmark', verifyJWT, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      userId: req.user.id,
      type: 'resource',
      itemId: req.params.id
    });

    if (bookmark) {
      await bookmark.deleteOne();
      res.status(200).json({ message: 'Resource unbookmarked' });
    } else {
      const newBookmark = new Bookmark({
        userId: req.user.id,
        type: 'resource',
        itemId: req.params.id
      });
      await newBookmark.save();
      res.status(200).json({ message: 'Resource bookmarked' });
    }
  } catch (error) {
    console.error('Bookmark error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create resource (admin only)
router.post('/resources', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const { title, description, category, type, link, image, icon } = req.body;

    const resource = new Resource({
      title,
      description,
      category,
      type,
      link,
      image,
      icon
    });

    await resource.save();
    res.status(201).json({ message: 'Resource created successfully', resource });
  } catch (error) {
    console.error('Create resource error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update resource (admin only)
router.put('/resources/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const { title, description, category, type, link, image, icon } = req.body;

    resource.title = title;
    resource.description = description;
    resource.category = category;
    resource.type = type;
    resource.link = link;
    resource.image = image;
    resource.icon = icon;

    await resource.save();
    res.status(200).json({ message: 'Resource updated successfully', resource });
  } catch (error) {
    console.error('Update resource error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete resource (admin only)
router.delete('/resources/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Competitions endpoints
router.get('/competitions', async (req, res) => {
  try {
    const { category, status, search, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const [competitions, total] = await Promise.all([
      Competition.find(query)
        .sort({ endDate: -1 })
        .skip(skip)
        .limit(limit),
      Competition.countDocuments(query)
    ]);

    const categories = await Competition.distinct('category');
    const statuses = ['open', 'closed'];

    res.status(200).json({
      competitions,
      categories,
      statuses,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalCompetitions: total
    });
  } catch (error) {
    console.error('Competitions error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single competition
router.get('/competitions/:id', async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    // Add bookmark status if user is authenticated
    if (req.user) {
      const isBookmarked = await Bookmark.findOne({
        userId: req.user.id,
        type: 'competition',
        itemId: req.params.id
      });
      competition.isBookmarked = !!isBookmarked;
    }

    res.status(200).json(competition);
  } catch (error) {
    console.error('Competition error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Toggle bookmark for competition
router.post('/competitions/:id/bookmark', verifyJWT, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      userId: req.user.id,
      type: 'competition',
      itemId: req.params.id
    });

    if (bookmark) {
      await bookmark.deleteOne();
      res.status(200).json({ message: 'Competition unbookmarked' });
    } else {
      const newBookmark = new Bookmark({
        userId: req.user.id,
        type: 'competition',
        itemId: req.params.id
      });
      await newBookmark.save();
      res.status(200).json({ message: 'Competition bookmarked' });
    }
  } catch (error) {
    console.error('Bookmark error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create competition (admin only)
router.post('/competitions', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const { title, description, category, status, startDate, endDate, requirements, prizes, image } = req.body;

    const competition = new Competition({
      title,
      description,
      category,
      status,
      startDate,
      endDate,
      requirements,
      prizes,
      image
    });

    await competition.save();
    res.status(201).json({ message: 'Competition created successfully', competition });
  } catch (error) {
    console.error('Create competition error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update competition (admin only)
router.put('/competitions/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    const { title, description, category, status, startDate, endDate, requirements, prizes, image } = req.body;

    competition.title = title;
    competition.description = description;
    competition.category = category;
    competition.status = status;
    competition.startDate = startDate;
    competition.endDate = endDate;
    competition.requirements = requirements;
    competition.prizes = prizes;
    competition.image = image;

    await competition.save();
    res.status(200).json({ message: 'Competition updated successfully', competition });
  } catch (error) {
    console.error('Update competition error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete competition (admin only)
router.delete('/competitions/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const competition = await Competition.findByIdAndDelete(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    res.status(200).json({ message: 'Competition deleted successfully' });
  } catch (error) {
    console.error('Delete competition error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Channels endpoints
router.get('/channels', async (req, res) => {
  try {
    const { type, search, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (type) query.type = type;
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const [channels, total] = await Promise.all([
      Channel.find(query)
        .sort({ featured: -1, members: -1 })
        .skip(skip)
        .limit(limit)
        .populate('members', 'name email'),
      Channel.countDocuments(query)
    ]);

    const types = ['public', 'private'];
    const featuredChannels = await Channel.find({ featured: true }).sort({ members: -1 }).limit(3);

    res.status(200).json({
      channels,
      types,
      featured: featuredChannels,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalChannels: total
    });
  } catch (error) {
    console.error('Channels error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single channel
router.get('/channels/:id', async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate('members', 'name email');
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    // Add bookmark status if user is authenticated
    if (req.user) {
      const isBookmarked = await Bookmark.findOne({
        userId: req.user.id,
        type: 'channel',
        itemId: req.params.id
      });
      channel.isBookmarked = !!isBookmarked;
    }

    res.status(200).json(channel);
  } catch (error) {
    console.error('Channel error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Toggle bookmark for channel
router.post('/channels/:id/bookmark', verifyJWT, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      userId: req.user.id,
      type: 'channel',
      itemId: req.params.id
    });

    if (bookmark) {
      await bookmark.deleteOne();
      res.status(200).json({ message: 'Channel unbookmarked' });
    } else {
      const newBookmark = new Bookmark({
        userId: req.user.id,
        type: 'channel',
        itemId: req.params.id
      });
      await newBookmark.save();
      res.status(200).json({ message: 'Channel bookmarked' });
    }
  } catch (error) {
    console.error('Bookmark error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create channel (admin only)
router.post('/channels', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const { name, description, type, image, featured } = req.body;

    const channel = new Channel({
      name,
      description,
      type,
      image,
      featured,
      members: []
    });

    await channel.save();
    res.status(201).json({ message: 'Channel created successfully', channel });
  } catch (error) {
    console.error('Create channel error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update channel (admin only)
router.put('/channels/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    const { name, description, type, image, featured } = req.body;

    channel.name = name;
    channel.description = description;
    channel.type = type;
    channel.image = image;
    channel.featured = featured;

    await channel.save();
    res.status(200).json({ message: 'Channel updated successfully', channel });
  } catch (error) {
    console.error('Update channel error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete channel (admin only)
router.delete('/channels/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const channel = await Channel.findByIdAndDelete(req.params.id);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    res.status(200).json({ message: 'Channel deleted successfully' });
  } catch (error) {
    console.error('Delete channel error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Join channel
router.post('/channels/:id/join', verifyJWT, async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    if (channel.type === 'private' && !channel.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Cannot join private channel' });
    }

    if (!channel.members.includes(req.user.id)) {
      channel.members.push(req.user.id);
      await channel.save();
    }

    res.status(200).json({ message: 'Joined channel successfully' });
  } catch (error) {
    console.error('Join channel error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Leave channel
router.post('/channels/:id/leave', verifyJWT, async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    if (channel.members.includes(req.user.id)) {
      channel.members = channel.members.filter(id => id.toString() !== req.user.id);
      await channel.save();
    }

    res.status(200).json({ message: 'Left channel successfully' });
  } catch (error) {
    console.error('Leave channel error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Partnerships endpoints
router.get('/partnerships', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (category) query.category = category;
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const [partners, total] = await Promise.all([
      Partner.find(query)
        .sort({ featured: -1, since: 1 })
        .skip(skip)
        .limit(limit),
      Partner.countDocuments(query)
    ]);

    const categories = await Partner.distinct('category');
    const featuredPartners = await Partner.find({ featured: true }).sort({ since: 1 }).limit(3);

    res.status(200).json({
      partners,
      categories,
      featured: featuredPartners,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalPartners: total
    });
  } catch (error) {
    console.error('Partnerships error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single partner
router.get('/partnerships/:id', async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    // Add bookmark status if user is authenticated
    if (req.user) {
      const isBookmarked = await Bookmark.findOne({
        userId: req.user.id,
        type: 'partner',
        itemId: req.params.id
      });
      partner.isBookmarked = !!isBookmarked;
    }

    res.status(200).json(partner);
  } catch (error) {
    console.error('Partner error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Toggle bookmark for partner
router.post('/partnerships/:id/bookmark', verifyJWT, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      userId: req.user.id,
      type: 'partner',
      itemId: req.params.id
    });

    if (bookmark) {
      await bookmark.deleteOne();
      res.status(200).json({ message: 'Partner unbookmarked' });
    } else {
      const newBookmark = new Bookmark({
        userId: req.user.id,
        type: 'partner',
        itemId: req.params.id
      });
      await newBookmark.save();
      res.status(200).json({ message: 'Partner bookmarked' });
    }
  } catch (error) {
    console.error('Bookmark error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create partner (admin only)
router.post('/partnerships', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const { name, description, category, logo, website, since, featured } = req.body;

    const partner = new Partner({
      name,
      description,
      category,
      logo,
      website,
      since: new Date(since),
      featured
    });

    await partner.save();

    // Create notifications for all users
    const users = await User.find();
    const notifications = users.map(user => new Notification({
      userId: user.id,
      type: 'partner_added',
      title: 'New Partner Added',
      message: `A new partner ${name} has been added to our network`,
      data: {
        partnerId: partner.id,
        partnerName: name
      }
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({ message: 'Partner created successfully', partner });
  } catch (error) {
    console.error('Create partner error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update partner (admin only)
router.put('/partnerships/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    const { name, description, category, logo, website, since, featured } = req.body;

    partner.name = name;
    partner.description = description;
    partner.category = category;
    partner.logo = logo;
    partner.website = website;
    partner.since = since ? new Date(since) : partner.since;
    partner.featured = featured;

    await partner.save();

    // Create notification for users who have bookmarked this partner
    const bookmarks = await Bookmark.find({
      type: 'partner',
      itemId: req.params.id
    });

    const notifications = bookmarks.map(bookmark => new Notification({
      userId: bookmark.userId,
      type: 'partner_updated',
      title: 'Partner Updated',
      message: `The partner ${name} has been updated`,
      data: {
        partnerId: partner.id,
        partnerName: name
      }
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    res.status(200).json({ message: 'Partner updated successfully', partner });
  } catch (error) {
    console.error('Update partner error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete partner (admin only)
router.delete('/partnerships/:id', verifyJWT, checkRole('Admin'), async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    // Create notification for users who have bookmarked this partner
    const bookmarks = await Bookmark.find({
      type: 'partner',
      itemId: req.params.id
    });

    const notifications = bookmarks.map(bookmark => new Notification({
      userId: bookmark.userId,
      type: 'partner_removed',
      title: 'Partner Removed',
      message: `The partner ${partner.name} has been removed`,
      data: {
        partnerId: partner.id,
        partnerName: partner.name
      }
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    // Delete partner and related bookmarks
    await Promise.all([
      partner.deleteOne(),
      Bookmark.deleteMany({
        type: 'partner',
        itemId: req.params.id
      })
    ]);

    res.status(200).json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Delete partner error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
