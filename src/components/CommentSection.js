import React, { useState, useEffect } from "react";
import { addComment, getCommentsByTrackId } from "../services/faunaService";

function CommentSection({ trackId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ author: "", content: "" });

  useEffect(() => {
    fetchComments();
  }, [trackId]);

  const fetchComments = async () => {
    try {
      const fetchedComments = await getCommentsByTrackId(trackId);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment(trackId, newComment.author, newComment.content);
      setNewComment({ author: "", content: "" });
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="comments-section">
      <h3>Commenti</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Il tuo nome"
          value={newComment.author}
          onChange={(e) =>
            setNewComment({ ...newComment, author: e.target.value })
          }
          required
        />
        <textarea
          placeholder="Il tuo commento"
          value={newComment.content}
          onChange={(e) =>
            setNewComment({ ...newComment, content: e.target.value })
          }
          required
        />
        <button type="submit">Invia commento</button>
      </form>
      <div id="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="author">{comment.author}</div>
            <div className="date">
              {new Date(comment.createdAt).toLocaleString()}
            </div>
            <div className="content">{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
