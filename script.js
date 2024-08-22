document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audioPlayer");
  const nowPlaying = document.getElementById("nowPlaying");
  const tracks = document.querySelectorAll(".track");

  tracks.forEach((track) => {
    track.addEventListener("click", function () {
      const trackSrc = this.getAttribute("data-src");
      const trackName = this.textContent;

      audioPlayer.src = trackSrc;
      audioPlayer.play();
      nowPlaying.textContent = trackName;

      tracks.forEach((t) => t.classList.remove("playing"));
      this.classList.add("playing");
    });
  });
});
