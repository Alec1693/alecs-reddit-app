import fetch from "node-fetch";

export async function handler(event, context) {
  const subreddit = event.queryStringParameters.subreddit;

  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`, 
      {headers: {
                    "User-Agent": "alecs-minimal-reddit-app/0.1 by Alec1693"
                }}
    );

    if (!response.ok) {
      console.error(`Reddit API returned status ${response.status}`);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch Reddit data' }),
      };
    }

    const text = await response.text();

    if (!text) {
      console.error('Empty response from Reddit API');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Empty response from Reddit API' }),
      };
    }

    const json = JSON.parse(text);
    const posts = json.data.children.map((child) => child.data);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(posts),
    };
  } catch (err) {
    console.error('Error fetching Reddit data:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch Reddit data' }),
    };
  }
}
    