import './App.css';
import Header from './Components/Header';
import Searchbox from './Components/Searchbox';
import SubReddit from './Components/SubReddits/SubReddit';
import PostFeed from './Components/Posts/PostFeed';

function App() {

  return (
    <div className="App">
      <div>
        <Header />
        <Searchbox />
      </div>
      <div>
        <PostFeed />
        <SubReddit />
      </div>
    </div>
  );
}

export default App;
