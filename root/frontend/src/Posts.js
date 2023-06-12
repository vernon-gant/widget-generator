import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faComments, faThumbsUp, faUser} from '@fortawesome/free-solid-svg-icons';
import Loader from "./Loader";
import {formatDate} from './Utils';

function Posts({posts = [], loading}) {

    if (loading) return <Loader/>;

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
                                        <FontAwesomeIcon icon={faUser} style={{color: '#5b4db7'}}/>{' '}
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
