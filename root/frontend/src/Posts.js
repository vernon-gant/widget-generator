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

        fetch('http://127.0.0.1:5000/reddit?subreddit=LevusWorkstation&limit=10')
            .then(response => response.json())
            .then(data => setPosts(data.data))
            .catch(error => console.error(error));
    }, [postType, numPosts]);
    return (
        <div className="container">
            <PostTypeSelect postType={postType} onPostTypeChange={handlePostTypeChange}/>
            <div className="mb-3">
                <label htmlFor="numPosts" className="form-label">Anzahl der Beiträge:</label>
                <input type="number" id="numPosts" name="numPosts" value={numPosts} min="1" max="100"
                       onChange={handleNumPostsChange} className="form-control"/>
            </div>
            <div className="row">
                {posts.map(post => (
                    <div key={post.id} className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-header">
                                <a href={"https://www.reddit.com" + post.url}
                                   className="card-title">{post.title}</a>
                                <div className="card-subtitle">{post.author}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;