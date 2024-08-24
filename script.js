document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.getElementById("comment-form");
  const commentsList = document.getElementById("comments-list");

  // commentForm.addEventListener("submit", function (e) {
  //   e.preventDefault();

  //   const name = document.getElementById("name").value;
  //   const comment = document.getElementById("comment").value;
  //   const date = new Date().toLocaleString();

  //   addComment(name, comment, date);

  //   // Resetta il form
  //   commentForm.reset();
  // });

  function addComment(name, comment, date) {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.innerHTML = `
            <div class="author">${name}</div>
            <div class="date">${date}</div>
            <div class="content">${comment}</div>
        `;

    commentsList.prepend(commentElement);
  }
});

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
