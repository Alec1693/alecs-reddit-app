export async function handler(event, context) {
  try {
    const response = await fetch(
      'https://www.reddit.com/subreddits/popular.json?limit=25'
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
