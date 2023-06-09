import {Link, useLocation, useParams} from 'react-router-dom';
import Posts from "./Posts";
import Navigation from "./Navba";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowLeft} from "@fortawesome/free-solid-svg-icons";
import './DisplayPosts.css';


function DisplayPosts() {
    //console.log("DisplayPosts rendered")
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let subredditName = params.get('subreddit');

    return (
        <div>
            <Navigation/>
            <br/> <br/> <br/> <br/>
            <Link to="/" element="{<HomePage/>}" role="button">
                   <FontAwesomeIcon icon={faLongArrowLeft} className="back-button" />
            </Link>

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
                <Posts subreddit={subredditName}/>
            </div>
        </div>
    );
}

export default DisplayPosts;