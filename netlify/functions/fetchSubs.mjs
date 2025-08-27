export async function handler(event, context) {
  try {
    // Step 1: Get access token
    const authResponse = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        "Authorization":
          "Basic " +
          Buffer.from(
            `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          process.env.REDDIT_USER_AGENT
      },
      body: "grant_type=client_credentials",
    });

    const authData = await authResponse.json();

    if (!authResponse.ok) {
      console.error("OAuth failed:", authData);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "OAuth authentication failed",
          details: authData,
        }),
      };
    }

    const accessToken = authData.access_token;

    // Step 2: Fetch popular subreddits with OAuth
    const response = await fetch(
      "https://oauth.reddit.com/subreddits/popular?limit=25",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent":
            process.env.REDDIT_USER_AGENT ||
            "MinimalRedditApp:v1.0 (by /u/yourusername)",
        },
      }
    );

    if (!response.ok) {
      console.error(`Reddit API returned status ${response.status}`);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to fetch Reddit data" }),
      };
    }

    const json = await response.json();
    const subreddits = json.data.children.map((child) => child.data);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(subreddits),
    };
  } catch (err) {
    console.error("Error fetching Reddit data:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch Reddit data" }),
    };
  }
}