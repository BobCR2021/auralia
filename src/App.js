import React, { useState, useEffect } from "react";
import AlbumCover from "./components/AlbumCover";
import Tracklist from "./components/Tracklist";
import Player from "./components/Player";
import CommentSection from "./components/CommentSection";
import "./App.css";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const tracks = [
    { id: 1, title: "Viaggio Infinito", src: "./assets/Viaggio Infinito.mp3" },
    {
      id: 2,
      title: "Segreti Nella Notte",
      src: "./assets/Segreti Nella Notte.mp3",
    },
    { id: 3, title: "Balla Con Noi", src: "./assets/Balla Con Noi.mp3" },
    { id: 4, title: "Estate Di Vita", src: "./assets/Estate di Vita.mp3" },
    {
      id: 5,
      title: "La Forza Dentro Te",
      src: "./assets/La Forza Dentro Te.mp3",
    },
    { id: 6, title: "Cuore Spezzato", src: "./assets/Cuore Spezzato.mp3" },
    { id: 7, title: "Giovane Donna", src: "./assets/Giovane Donna.mp3" },
    { id: 8, title: "Sempre Amici", src: "./assets/Sempre Amici.mp3" },
    { id: 9, title: "Giorni Perduti", src: "./assets/Giorni Perduti.mp3" },
    { id: 10, title: "Contro Corrente", src: "./assets/Contro Corrente.mp3" },
  ];

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleTrackEnd = () => {
    const currentIndex = tracks.findIndex(
      (track) => track.id === currentTrack.id
    );
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(true); // Ensure autoplay when moving to next track
  };

  useEffect(() => {
    if (currentTrack) {
      setIsPlaying(true);
    }
  }, [currentTrack]);

  return (
    <div className="App">
      <ThemeToggle />
      <header>
        <h1>Voci del Cuore</h1>
        <p>Il nuovo album di Auralia</p>
      </header>
      <div className="content-wrapper">
        <div className="album-cover-tracklist">
          <AlbumCover />
          <Tracklist
            tracks={tracks}
            onTrackSelect={handleTrackSelect}
            currentTrack={currentTrack}
          />
        </div>
        <Player
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onTrackEnd={handleTrackEnd}
          disableRightClick={true}
        />
        <CommentSection />
      </div>
      <footer>
        <div className="copyright">© 2024 Bob Production</div>
        <div className="copyright">bobproduction2024@gmail.com</div>
      </footer>
    </div>
  );
}

export default App;
