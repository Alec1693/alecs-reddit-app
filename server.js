const express = require('express');
const cors = require('cors');
const router = express.Router();

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/:subreddit', async (req, res) => {
  const {subreddit} = req.params;
  
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);

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

app.get('/api/reddit-sub-icons/:subreddit', async (req, res) => {
  const {subreddit} = req.params;
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/about.json`);


    if(!response.ok){
      console.error(`Reddit API returned status ${response.status}`);
      return res.status(response.status).json({error:'Failed to fetch Reddit data'});
    }

    const json = await response.text();

    const iconData = {
      display_name: json.data.display_name,
      icon_img: json.data.icon_img || json.data.community_icon || null,
      title: json.data.title,
      subscribers: json.data.subscribers
    }
    res.json(iconData);

    
  } catch (err) {
    console.error('Error fetching Reddit data:', err);
    res.status(500).json({ error: 'Failed to fetch Reddit data' });
  }
});

app.get('/api/reddit-popular-subreddits', async (req, res) => {
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


app.get('/api/:sub/comments/:id', async (req, res) => {
  const {sub,id} = req.params;
  try {
    const response = await fetch(`https://www.reddit.com/r/${sub}/comments/${id}.json`);


    if(!response.ok){
      console.error(`Reddit API returned status ${response.status}`);
      return res.status(response.status).json({error:'Failed to fetch Reddit data'});
    }

    const json = await response.json();

    if(!json){
      console.error('Empty response from Reddit API');
      return res.status(500).json({error: 'Empty response from Reddit API'});
    }

    const comments = json[1]?.data?.children || [];
    res.json(comments);
  } catch (err) {
    console.error('Error fetching Reddit data:', err);
    res.status(500).json({ error: 'Failed to fetch Reddit data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
