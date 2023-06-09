import {useLocation, useParams} from 'react-router-dom';
import Posts from "./Posts";
import Navigation from "./Navba";
import React from "react";
import WidgetList from "./FrequentlyUsedWidgets";

function DisplayPosts() {
    //console.log("DisplayPosts rendered")
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let subredditName = params.get('subreddit');

    return (
        <div>
            <Navigation/>
            <br/> <br/> <br/> <br/>
            <div style={{textAlign: 'center'}}>
                <h1
                    style={{
                        textTransform: 'uppercase',
                        color: '#3c2a64',
                        textShadow: '0 0 3px #f069d9',
                        textDecoration: 'underline dashed #f069d9',
                        fontFamily: 'sans-serif',
                        fontSize: '40px',
                        //boxShadow:'10 10 2px pink',
                    }}>
                    <b>{subredditName}</b>
                </h1>
            </div>
            <br/> <br/>
            <div>
                <Posts subreddit={subredditName}/>
            </div>
            <WidgetList/>
        </div>
    );
}

export default DisplayPosts;