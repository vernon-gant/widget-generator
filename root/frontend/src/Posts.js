import React, {useEffect, useState} from 'react';
import PostTypeSelect from './PostTypeSelect';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap importieren
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendar, faComments, faThumbsUp, faUser} from '@fortawesome/free-solid-svg-icons'


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
        fetch('http://127.0.0.1:5000/reddit?subreddit=LevusWorkstation&limit=15', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => setPosts(data.posts))
            .catch(error => console.error(error));
    }, [postType, numPosts]);


    return (
        <div className="container">
            <PostTypeSelect postType={postType} onPostTypeChange={handlePostTypeChange}/>
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
                      <img
                        src={post.images[0]}
                        alt="Post Image"
                        className={`card-img-top ${post.video ? 'img-fluid' : 'img-thumbnail'}`}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title" style={{
                          backgroundImage: 'linear-gradient(to right, #9325cf, yellow)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontWeight: 'extra bold',
                          textDecoration: 'underline'  }}>
                          <b>{post.title}</b>
                      </h5>

                      <a href="card-url" >{post.url}</a>
                      {(!post.images || post.images.length === 0) && !post.video && (
                         <p className="card-text">{post.content}</p>
                       )}
                        <br /><br /> <div className="card-subtitle small"><b><FontAwesomeIcon icon={faUser} style={{ color: '#6a208a' }} /> </b>{post.author}</div>
                        <div className="card-comments small"><b><FontAwesomeIcon icon={faComments} /></b> {post.comments}</div>
                        <div className="card-likes btn-success small"><b><FontAwesomeIcon icon={faThumbsUp} style={{color:'#20478a'}}/></b> {post.likes}</div>
                      <div className="card-date small"><FontAwesomeIcon icon={faCalendar} /> Date: {post.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
      </div>
    );
}

export default Posts;