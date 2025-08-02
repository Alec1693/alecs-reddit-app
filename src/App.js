import './App.css';
import Header from './Components/Header';
import Searchbox from './Components/Searchbox';
import PostFeed from './Components/Posts/PostFeed';
import SubRedditContainer from './Components/SubReddits/SubRedditContainer';

function App() {

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
      <div className='feed-category-layout'>
        <PostFeed />
        <SubRedditContainer />
      </div>
    </div>
  );
}

export default App;
