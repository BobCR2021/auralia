import React from "react";

function Tracklist({ tracks, onTrackSelect, currentTrack }) {
  return (
    <div className="tracklist">
      <h2>Tracce</h2>
      {tracks.map((track) => (
        <div
          key={track.id}
          className={`track ${
            currentTrack && currentTrack.id === track.id ? "playing" : ""
          }`}
          onClick={() => onTrackSelect(track)}
        >
          {track.id}. {track.title}
        </div>
      ))}
    </div>
  );
}

export default Tracklist;
