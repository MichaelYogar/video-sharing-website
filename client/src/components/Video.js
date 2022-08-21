import React from "react";

const Video = ({ url }) => {
  return (
    <div>
      <video controls muted>
        <source src={url} type="video/mp4"></source>
      </video>
    </div>
  );
};

export default Video;
