export async function handler(event, context) {
  const { subreddit } = event.pathParameters;

  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/about.json`);

    if (!response.ok) {
      console.error(`Reddit API returned status ${response.status}`);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch Reddit data' }),
      };
    }

    const json = await response.json();

    const iconData = {
      display_name: json.data.display_name,
      icon_img: json.data.icon_img || json.data.community_icon || null,
      title: json.data.title,
      subscribers: json.data.subscribers,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(iconData),
    };
  } catch (err) {
    console.error('Error fetching Reddit data:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch Reddit data' }),
    };
  }
}
