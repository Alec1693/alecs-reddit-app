export async function handler(event, context) {
  const sub = event.queryStringParameters?.sub;
  const id = event.queryStringParameters?.id;

  if (!sub || !id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing subreddit or post ID' }),
    };
  }

  try {
    // Step 1: Get OAuth token
    const authResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization':
          'Basic ' +
          Buffer.from(
            `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`
          ).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent':
          process.env.REDDIT_USER_AGENT
      },
      body: 'grant_type=client_credentials',
    });

    const authData = await authResponse.json();

    if (!authResponse.ok) {
      console.error('OAuth failed:', authData);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'OAuth authentication failed', details: authData }),
      };
    }

    const accessToken = authData.access_token;

    // Step 2: Fetch comments from Reddit
    const response = await fetch(
      `https://oauth.reddit.com/r/${sub}/comments/${id}?limit=5`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent':
            process.env.REDDIT_USER_AGENT ||
            'MinimalRedditApp:v1.0 (by /u/yourusername)',
        },
      }
    );

    if (!response.ok) {
      console.error(`Reddit API returned status ${response.status}`);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch Reddit data' }),
      };
    }

    const json = await response.json();
    const comments = json[1]?.data?.children || [];

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(comments),
    };
  } catch (err) {
    console.error('Error fetching Reddit data:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch Reddit data' }),
    };
  }
}
