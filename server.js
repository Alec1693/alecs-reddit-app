const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/reddit-top', async (req, res) => {
  try {
    const response = await fetch('https://www.reddit.com/top.json');


    if(!response.ok){
      console.error(`Reddit API returned status ${response.status}`);
      return res.status(response.status).json({error:'Failed to fetch Reddit data'});
    }

    const text = await response.text();

    if(!text){
      console.error('Empty response from Reddit API');
      return res.status(500).json({error: 'Empty response from Reddit API'});
    }

    const json = JSON.parse(text);
    const posts = json.data.children.map((child) => child.data);
    res.json(posts);
  } catch (err) {
    console.error('Error fetching Reddit data:', err);
    res.status(500).json({ error: 'Failed to fetch Reddit data' });
  }
});

app.get('/api/:subreddit', async (req, res) => {
  try {
    const response = await fetch('https://www.reddit.com/subreddits/popular.json?limit=25');


    if(!response.ok){
      console.error(`Reddit API returned status ${response.status}`);
      return res.status(response.status).json({error:'Failed to fetch Reddit data'});
    }

    const text = await response.text();

    if(!text){
      console.error('Empty response from Reddit API');
      return res.status(500).json({error: 'Empty response from Reddit API'});
    }

    const json = JSON.parse(text);
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
