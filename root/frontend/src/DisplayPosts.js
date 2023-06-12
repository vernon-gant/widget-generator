import Posts from "./Posts";
import Navigation from "./Navba";
import React from "react";
import './DisplayPosts.css';
import FetchPosts from "./FetchPosts";
import {useSubreddit} from "./Utils";
import Loader from "./Loader";
import Error from "./Error";
import BackButton from "./BackButton";


function DisplayPosts() {

    const subredditName = useSubreddit();

    const {posts, loading, error} = FetchPosts({subreddit: subredditName, numPosts: 10});

    if (loading) return <Loader/>;

    if (error) return <Error error={error}/>;


    return (
        <div>
            <Navigation/>
            <br/> <br/> <br/> <br/>
            <BackButton/>

            <div style={{textAlign: 'center'}}>
                <h1
                    style={{
                        textTransform: 'uppercase',
                        color: '#3c2a64',
                        textShadow: '0 0 3px #f069d9',
                        textDecoration: 'underline #f069d9',
                        fontFamily: 'sans-serif',
                        fontSize: '40px',
                        //boxShadow:'10 10 2px pink',
                    }}>
                    <b>{subredditName}</b>
                </h1>
            </div>
            <br/> <br/>
            <div>
                <Posts posts={posts} loading={loading}/>
            </div>
        </div>
    );
}

export default DisplayPosts;