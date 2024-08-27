import React, { useState } from "react";

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      name,
      comment,
      date: new Date().toLocaleString(),
    };
    setComments([newComment, ...comments]);
    setName("");
    setComment("");
  };

  return (
    <div className="comments-section">
      <h3>Commenti</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Commento"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <button type="submit">Invia Commento</button>
      </form>
      <div id="comments-list">
        {comments.map((c, index) => (
          <div key={index} className="comment">
            <div className="author">{c.name}</div>
            <div className="date">{c.date}</div>
            <div className="content">{c.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
