import {useLocation} from "react-router-dom";


export function useSubreddit() {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    return params.get('subreddit');
}

export function formatDate(date) {
    return new Date(date).toLocaleString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}