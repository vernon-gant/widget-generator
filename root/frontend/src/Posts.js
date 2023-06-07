import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarAlt, faComments, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons';

function Posts({ subreddit = 'all', numPosts = null }) {
  const [posts, setPosts] = useState([]);
  const [postType, setPostType] = useState('hot');
  const [limit, setLimit] = useState(numPosts);

  const handlePostTypeChange = event => {
    setPostType(event.target.value);
  };

 const handleNumPostsChange = event => {
  const newLimit = parseInt(event.target.value);
  if (isNaN(newLimit) || event.target.value === '') {
    setLimit(null);
  } else {
    setLimit(newLimit);
  }
};

  useEffect(() => {
    if (limit !== null) {
      fetch(`http://127.0.0.1:5000/reddit?subreddit=${subreddit}&limit=${limit}&postType=${postType}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => setPosts(data.posts))
        .catch(error => console.error(error));
    }
  }, [subreddit, limit, postType]);

  const formatDate = date => {
    return new Date(date).toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };




  return (
    <div className="container">

      <div className="mb-3">
        <label htmlFor="postType" className="form-label">
          Post Type:
        </label>
        <select
          id="postType"
          name="postType"
          value={postType}
          onChange={handlePostTypeChange}
          className="form-select"
        >
          <option value="hot">Hot</option>
          <option value="new">New</option>
          <option value="top">Top</option>
          <option value="random">Random</option>
          <option value="rising">Rising</option>
          <option value="gaming">Gaming</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="numPosts" className="form-label">
          Number of posts:
        </label>
        <input
          type="number"
          id="numPosts"
          name="numPosts"
          value={limit || ''}
          min="1"
          max="100"
          onChange={handleNumPostsChange}
          className="form-control number-input"
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'textfield',
          }}
        />
      </div>

      <div className="row">
        {posts.map(post => (
          <div key={post.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <a
                   href={`https://www.reddit.com${post.url}`}
                    style={{
                      color: 'black',
                      textDecoration: 'underline',
                      backgroundImage: 'linear-gradient(to right, #20478a, #9325cf)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: 'extra bold',
                    }}
                  >
                    <b>{post.title}</b>
                  </a>
                </h5>
                <br />
                {post.images && post.images.length > 0 && (
                  <div className="mb-3 text-center">
                    <img
                      src={post.images[0]}
                      alt="Post Image"
                      className="img-fluid mx-auto d-block"
                      style={{ maxHeight: '350px', objectFit: 'cover' }}
                    />
                  </div>
                )}

                {(!post.images || post.images.length === 0) && !post.video && (
                  <p className="card-text">{post.content}</p>
                )}

                <div className="card-subtitle small">
                  <b>
                    <FontAwesomeIcon icon={faUser} style={{ color: '#6a208a' }} />{' '}
                  </b>
                  {post.author}
                </div>
                <div className="card-comments small">
                  <b>
                    <FontAwesomeIcon icon={faComments} />
                  </b>{' '}
                  {post.comments}
                </div>
                <div className="card-likes btn-success small">
                  <b>
                    <FontAwesomeIcon icon={faThumbsUp} style={{ color: '#20478a' }} />
                  </b>{' '}
                  {post.likes}
                </div>
                <div className="card-date small">
                  <FontAwesomeIcon icon={faCalendarAlt} /> {formatDate(post.date)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
