import {useEffect, useState} from "react";

export default function FetchPosts({subreddit = "", numPosts = 2}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`http://127.0.0.1:5000/reddit?subreddit=${subreddit}&limit=${numPosts}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                switch (response.status) {
                    case 404:
                        throw new Error("Subreddit not found...");
                    case 403:
                        throw new Error("Subreddit is private...");
                    case 500:
                        throw new Error("We tried, but something went wrong...");
                    default:
                        return response.json();
                }
            })
            .then(data => {
                setPosts(data.posts);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
                setLoading(false);
            });
    }, [subreddit, numPosts]);

    return {posts, loading, error};
}

