import { useParams } from 'react-router-dom';

function DisplayPosts() {
  const { subredditName } = useParams();

  return (
    <div>
      <h1>{subredditName} posts</h1>
      {/*  code here
        Subreddits aus Reddit-API abrufen und anzeigen fehlt, ich weiß nicht mehr wessen Aufgabe das war.
        */}
    </div>
  );
}

export default DisplayPosts;