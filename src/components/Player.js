import React, { useRef, useEffect } from "react";

function Player({
  currentTrack,
  isPlaying,
  setIsPlaying,
  onTrackEnd,
  disableRightClick,
}) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentTrack && isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Autoplay was prevented:", error);
        setIsPlaying(false);
      });
    } else if (!isPlaying) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack, setIsPlaying]);

  const handleTrackEnd = () => {
    onTrackEnd();
  };

  const handleRightClick = (e) => {
    if (disableRightClick) {
      e.preventDefault();
    }
  };

  return (
    <div className="player" onContextMenu={handleRightClick}>
      <h3>Ora in riproduzione:</h3>
      <p>{currentTrack ? currentTrack.title : "Seleziona una traccia"}</p>
      <audio
        ref={audioRef}
        src={currentTrack ? currentTrack.src : ""}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleTrackEnd}
        controls
      />
    </div>
  );
}

export default Player;
