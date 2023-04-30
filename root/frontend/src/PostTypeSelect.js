import React from 'react';

function PostTypeSelect(props) {
  const handlePostTypeChange = event => {
    props.onPostTypeChange(event.target.value);
  };

  return (
    <div>
      <label>Post Type:</label>
      <select className="post-type" value={props.postType} onChange={handlePostTypeChange}>
        <option value="hot">Hot</option>
        <option value="new">New</option>
        <option value="top">Top</option>
        <option value="random">Random</option>
        <option value="rising">Rising</option>
        <option value="controversial">Controversial</option>
      </select>
    </div>
  );
}

export default PostTypeSelect;
