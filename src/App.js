import './App.css';
import Header from './Components/Header';
import Searchbox from './Components/Searchbox';
import Post from './Components/Posts/Post';
import SubReddit from './Components/SubReddits/SubReddit';
import { useSelector } from 'react-redux';
import { postFeedData } from './Features/postsSlice';

function App() {
  const posts = useSelector(postFeedData)

  const handleClick = () => {
    console.log(posts);
  }

  return (
    <div className="App">
      <div>
        <Header />
        <Searchbox />
      </div>
      <div>
        <Post />
        <SubReddit />
      </div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

export default App;
