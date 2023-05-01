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
// makes cross origin fetching possible
//const proxy = "https://cors-anywhere.herokuapp.com/";
fetch('https://www.reddit.com/r/javascript/' + postType + '.json?limit=' + numPosts)
            .then(response => response.json())
            .then(data => setPosts(data.data.children))
            .catch(error => console.error(error));
    }, [postType, numPosts]);
/*console.log(fetch("https://www.reddit.com/r/javascript/${postType}.json?limit=${numPosts}")
            .then(response => response.json())
            .then(data => setPosts(data.data.children)))*/
// Styling mit Bootstrap-Klassen
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
                    <div key={post.data.id} className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-header">
                                <a href={"https://www.reddit.com"+post.data.permalink}
                                   className="card-title">{post.data.title}</a>
                                <div className="card-subtitle">{post.data.author}</div>
                            </div>
                            <div className="card-body">
                                {post.data.url.includes('.jpg') || post.data.url.includes('.png') ? (
                                    <img src={post.data.url} alt={post.data.title} className="card-img-top"/>
                                ) : null}
                                <p className="card-text">{(post.data.selftext)}</p>
                            </div>
                            <div className="card-footer">
                                <div className="card-text">{post.data.score} points</div>
                                <div className="card-text">{post.data.num_comments} comments</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;