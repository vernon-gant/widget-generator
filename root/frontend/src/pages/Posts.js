import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faComments, faThumbsUp, faUser} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from "../hooks/Loader";
import {formatDate} from '../hooks/Utils';
import GenerateTag from "../components/GenerateTag";

function Posts({posts = [], loading}) {
    if (loading) return <Loader/>;

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
            <div
                style={{
                    textAlign: 'center',
                    padding: '20px',
                    //border: '1px solid', //#2f6270',
                    //borderColor: 'purple',
                    //borderRadius: '14px',
                    //boxShadow: '1px 1px 0px 0px #1d5956',
                    // boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                    //borderStyle: 'solid',
                }}
            >
                <GenerateTag/><br/> <br/>
                <div className="container">
                    <div className="row justify-content-center">
                        {posts.map(post => (
                            <div key={post.id} className="col-11 mb-5">
                                <div className="card">
                                    <div className="card-body"
                                         style={{

                                             //boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
                                             boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px ',
                                         }}
                                    >
                                        <br/><h5 className="card-title">
                                        <a
                                            href={`https://www.reddit.com${post.url}`}
                                            target={'_blank'}
                                            style={{
                                                color: '#9b4db7',
                                                textDecoration: 'underline #91842a',//orchid;
                                                //backgroundImage: 'linear-gradient(to right, #20478a, #9325cf)',
                                                backgroundImage: 'linear-gradient(to left, black, black)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                fontWeight: '300',
                                                textShadow: '0 0 0.2px #5b4db7',
                                                textDecorationThickness: "3px",
                                                fontSize: '26px',
                                                fontFamily: 'bold',
                                            }}
                                        >
                                            <b>{post.title}</b> <br/> <br/>
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
                                                /><br/>
                                            </div>
                                        )}

                                        {(!post.images || post.images.length === 0) && !post.video && (
                                            <p className="card-text">{post.content}</p>
                                        )}

                                        <div className="card-subtitle small">
                                            <b>
                                                <FontAwesomeIcon icon={faUser} style={{color: '#ad5010'}}/>{' '}
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
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <br/>
        </div>
    );
}

export default Posts;
