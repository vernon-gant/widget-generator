import {useLocation, useParams} from 'react-router-dom';
import Posts from "./Posts";

function DisplayPosts() {
    console.log("DisplayPosts rendered")
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let subredditName = params.get('subreddit');

    return (
        <div>
            <Posts subreddit={subredditName}/>
        </div>
    );
}

export default DisplayPosts;