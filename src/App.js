import './App.css';
import Header from './Components/Header';
import Searchbox from './Components/Searchbox';
import PostFeed from './Components/Posts/PostFeed';
import SubRedditContainer from './Components/SubReddits/SubRedditContainer';

function App() {
  //refactor the useEffect that's in PostFeed to the main App component and set the load home page feed to whatever the currently selected subreddit is. default is pics

  return (
    <div className="App">
      <div className='banner-container'>
        <div className='header-container'>
          <Header />
        </div>
        <div className='searchbox-container'>
          <Searchbox />
        </div>
      </div>
      <div className='feed-layout'>
        <div className='postfeed-container'>
          <PostFeed />
        </div>
        <div className='subreddit-container'>
          <SubRedditContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
