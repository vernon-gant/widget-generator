import { useParams } from 'react-router-dom';

function DisplayPosts() {
  const { subredditName } = useParams();

  return (
    <div>
      <h1>{subredditName} posts</h1>
      {/*  code here  */}
    </div>
  );
}

export default DisplayPosts;