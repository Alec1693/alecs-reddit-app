Core Features: Minimal Viable Product Browse Either Home page of reddit or specific subreddits Search bar to filter posts View comments on posts if “comment” button is clicked

User Stories: -As a user, I want to be able to view the home page of reddit (with posts) or click on a specific subreddit to view that sub’s posts -As a user, I can browse all posts without signing in -As a user, I can see comments on posts but can’t add a comment or up/down vote -As a user, I can search specific posts on the home page or subreddit

React Components

Page/View User can… Home feed View posts, filter by search, select subreddit from list Subreddit list Click on subreddit page to jump to Post detail View post, read comments

React Components <VoteButtons w/ Vote Count /> <Image/Video OR Body preview /> <Comment Button w/ Comment Count />

Redux Store { Posts: { byId: { id1: {id, title, content, voteCount, subredditId, commentCount, …} } }, Comments: { byPostId: { postId1: [{id, content, userId, parentId}] } } SubReddits: { postById: { id1: {id, name, description} } } }