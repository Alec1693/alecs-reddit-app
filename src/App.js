import './App.css';
import Header from './Components/Header';
import Searchbox from './Components/Searchbox';
import PostFeed from './Components/Posts/PostFeed';
import SubRedditContainer from './Components/SubReddits/SubRedditContainer';

function App() {
  //refactor the useEffect that's in PostFeed to the main App component and set the load home page feed to whatever the currently selected subreddit is. default is pics

  return (
    <div className='App'>
      <header>
        <Header />
        <Searchbox />
      </header>
      <main className='feed-layout'>
        <section className='postfeed-container'>
          <PostFeed />
        </section>
        <aside className='subreddit-container'>
          <SubRedditContainer />
        </aside>
      </main>
    </div>
  )
}

export default App;
