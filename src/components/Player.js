import React, { useRef, useEffect } from "react";

function Player({ currentTrack, isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  return (
    <div className="player">
      <h3>Ora in riproduzione:</h3>
      <p>{currentTrack ? currentTrack.title : "Seleziona una traccia"}</p>
      <audio
        ref={audioRef}
        src={currentTrack ? currentTrack.src : ""}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controls
      />
    </div>
  );
}

export default Player;
