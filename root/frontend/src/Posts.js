import React, {useEffect, useState} from 'react';
import PostTypeSelect from './PostTypeSelect';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap importieren

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

        fetch('http://127.0.0.1:5000/reddit?subreddit=LevusWorkstation&limit='+numPosts,{ // 3000: (the default port for React)
            mode: 'cors',
        })
            .then(response => response.json())
            .then(data => setPosts(data.data))
            .catch(error => console.error(error));
    }, [postType, numPosts]);
return (
    <div className="container">
      <PostTypeSelect postType={postType} onPostTypeChange={handlePostTypeChange} />
      <div className="mb-3">
        <label htmlFor="numPosts" className="form-label">
          Anzahl der Beiträge:
        </label>
        <input
          type="number"
          id="numPosts"
          name="numPosts"
          value={numPosts}
          min="1"
          max="100"
          onChange={handleNumPostsChange}
          className="form-control"
        />
      </div>
      <div className="row">
        {posts.map(post => (
          <div key={post.id} className="col-md-6 mb-4">
            <div className="card">
              {post.images && post.images.length > 0 && (
                <img src={post.images[0]} alt="Post Image" className="card-img-top" />
              )}

              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                  <a href="card-url">{post.url}</a>
                {(!post.images || post.images.length === 0) && !post.video && (
                  <p className="card-text">{post.content}</p>
                )}
                <div className="card-subtitle">{post.author}</div>
                <div className="card-comments">{post.comments}</div>
                <div className="card-likes btn-success">{post.likes}</div>
                <div className="card-date">{post.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;