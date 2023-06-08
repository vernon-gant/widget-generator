import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faComments, faThumbsUp, faUser} from '@fortawesome/free-solid-svg-icons';
import {MagnifyingGlass} from "react-loader-spinner";

function Posts({subreddit = null, numPosts = 2}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // new loading state
    const [limit, setLimit] = useState(numPosts);

    const formatDate = date => {
        return new Date(date).toLocaleString('de-DE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    useEffect(() => {
        if (subreddit) {
            setLoading(true);
            fetch(`http://127.0.0.1:5000/reddit?subreddit=${subreddit}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    setPosts(data.posts)
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error)
                    setLoading(false)
                });
        }
    }, [subreddit, limit]);

    // Return a loader if loading state is true
    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor='#c0efff'
                    color='#e15b64'
                />
            </div>
        );
    }


    return (
        <div className="container">
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
                                <br/>
                                {post.images && post.images.length > 0 && (
                                    <div className="mb-3 text-center">
                                        <img
                                            src={post.images[0]}
                                            alt="Post Image"
                                            className="img-fluid mx-auto d-block"
                                            style={{maxHeight: '350px', objectFit: 'cover'}}
                                        />
                                    </div>
                                )}

                                {(!post.images || post.images.length === 0) && !post.video && (
                                    <p className="card-text">{post.content}</p>
                                )}

                                <div className="card-subtitle small">
                                    <b>
                                        <FontAwesomeIcon icon={faUser} style={{color: '#6a208a'}}/>{' '}
                                    </b>
                                    {post.author}
                                </div>
                                <div className="card-comments small">
                                    <b>
                                        <FontAwesomeIcon icon={faComments}/>
                                    </b>{' '}
                                    {post.comments}
                                </div>
                                <div className="card-likes btn-success small">
                                    <b>
                                        <FontAwesomeIcon icon={faThumbsUp} style={{color: '#20478a'}}/>
                                    </b>{' '}
                                    {post.likes}
                                </div>
                                <div className="card-date small">
                                    <FontAwesomeIcon icon={faCalendarAlt}/> {formatDate(post.date)}
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
