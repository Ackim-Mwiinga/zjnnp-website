const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo purposes
let data = {
    users: [],
    articles: [],
    notifications: []
};

// Simple API endpoints
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/api/data', (req, res) => {
    res.json(data);
});

app.post('/api/data', (req, res) => {
    const { type, item } = req.body;
    if (type && item) {
        data[type].push(item);
        res.json({ success: true });
    } else {
        res.status(400).json({ error: 'Invalid request' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
