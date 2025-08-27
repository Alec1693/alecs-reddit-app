import fetch from "node-fetch";

export async function handler(event, context) {
  const subreddit = event.queryStringParameters?.subreddit;

  if (!subreddit) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing subreddit query parameter" }),
    };
  }

  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);

    if (!response.ok) {
      console.error(`Reddit API returned status ${response.status}`);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to fetch Reddit data" }),
      };
    }

    const json = await response.json();
    const posts = json.data.children.map((c) => c.data);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(posts),
    };
  } catch (err) {
    console.error("Error fetching Reddit data:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch Reddit data" }),
    };
  }
}