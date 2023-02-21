import React from "react";

const SongPage = ({ song }) => {
  return (
    <div className="SongPage">
      <div className="Song">
        <h1>{song.name}</h1>
        <h3>by {song.artist}</h3>
        <audio controls>
          <source src={song.url} />
        </audio>
      </div>
    </div>
  );
};

export default SongPage;
