import './App.css';
import Header from './Components/Header';
import Searchbox from './Components/Searchbox';
import PostFeed from './Components/Posts/PostFeed';
import SubRedditContainer from './Components/SubReddits/SubRedditContainer';

function App() {

  return (
    <div className="App">
      <div>
        <Header />
        <Searchbox />
      </div>
      <div className='feed-category-layout'>
        <PostFeed />
        <SubRedditContainer />
      </div>
    </div>
  );
}

export default App;
