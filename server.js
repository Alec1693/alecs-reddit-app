const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/reddit-top', async (req, res) => {
  try {
    const response = await fetch('https://www.reddit.com/top.json');
    const json = await response.json();
    const posts = json.data.children.map((child) => child.data);
    res.json(posts);
  } catch (err) {
    console.error('Error fetching Reddit data:', err);
    res.status(500).json({ error: 'Failed to fetch Reddit data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
