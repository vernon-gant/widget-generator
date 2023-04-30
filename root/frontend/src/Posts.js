import React, { useEffect, useState } from 'react';
import PostTypeSelect from './PostTypeSelect';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [postType, setPostType] = useState('hot');
  const [numPosts, setNumPosts] = useState(10);

  const handlePostTypeChange = newPostType => {
    setPostType(newPostType);
  };

  const handleNumPostsChange = event => {
    setNumPosts(event.target.value);
  };

  useEffect(() => {
    fetch(`https://www.reddit.com/r/javascript/${postType}.json?limit=${numPosts}`)
      .then(response => response.json())
      .then(data => setPosts(data.data.children))
      .catch(error => console.error(error));
  }, [postType, numPosts]);

  return (
      //Es kann sein, dass nicht immer die richtige Anzahl an Beiträgen angezeigt wird,
      // da die Anzahl der Beiträge begrenzt ist und Reddit möglicherweise nicht immer genügend Beiträge zurückgibt.
      // Möglicherweise kann dies auch auf Netzwerkprobleme zurückzuführen sein. Sie können versuchen,
      // die Anzahl der Beiträge zu erhöhen oder die Seite neu zu laden, um zu sehen, ob sich die Anzahl der Beiträge ändert.
    <div>
      <PostTypeSelect postType={postType} onPostTypeChange={handlePostTypeChange} />
      <div>
        <label htmlFor="numPosts">Anzahl der Beiträge: </label>

        <input type="number" id="numPosts" name="numPosts" value={numPosts} min="1" max="100" onChange={handleNumPostsChange} />
      </div>
      {posts.map(post => (
        <div key={post.data.id} className="post">
          <div className="post-header">
            <a href={`https://www.reddit.com${post.data.permalink}`} className="post-title">{post.data.title}</a>
            <div className="post-author">{`u/${post.data.author}`}</div>
          </div>
          <div className="post-content">
            {post.data.url.includes('.jpg') || post.data.url.includes('.png') ? (
              <img src={post.data.url} alt={post.data.title} className="post-image" />
            ) : null}
            <div className="post-text" dangerouslySetInnerHTML={{ __html: post.data.selftext_html }}></div>
          </div>
          <div className="post-footer">
            <div className="post-score">{post.data.score} points</div>
            <div className="post-comments">{post.data.num_comments} comments</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;