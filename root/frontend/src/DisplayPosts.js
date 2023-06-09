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
          <Navigation />
            <br /> <br /> <br /> <br />
            <div>
                <Posts subreddit={subredditName}/>
            </div>
            <WidgetList/>
        </div>
    );
}

export default DisplayPosts;