import React from "react";
import Navigation from "./Navba";
import Posts from "./Posts";
import FetchPosts from "./FetchPosts";
import {useSubreddit} from "./Utils";
import Loader from "./Loader";
import Error from "./Error";
import BackButton from "./BackButton";
import './css/DisplayPosts.css';

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

            <div style={{textAlign: "center"}}>
                <h1 className="twelve">
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