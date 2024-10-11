import React, { useState, useEffect, useCallback } from "react";
import { fql } from "fauna";
import client from "../services/faunaClient";

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Checking...");

  const testConnection = useCallback(async () => {
    try {
      const result = await client.query(fql`"Hello, Fauna!"`);
      console.log("Connection test result: Ok");
      setConnectionStatus("Connected successfully");
    } catch (error) {
      console.error("Connection test failed:", error);
      setConnectionStatus("Connection failed");
      setError(
        "Failed to connect to the database. Please check your configuration."
      );
    }
  }, []);

  useEffect(() => {
    testConnection();
  }, [testConnection]);

  const parseDate = (dateValue) => {
    if (typeof dateValue === "string") {
      return new Date(dateValue);
    } else if (dateValue && dateValue.isoString) {
      return new Date(dateValue.isoString);
    } else {
      return new Date();
    }
  };

  const fetchComments = useCallback(async () => {
    if (connectionStatus !== "Connected successfully") {
      setError("Cannot fetch comments: database connection not established.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      console.log("Attempting to fetch comments...");
      const result = await client.query(fql`
        comments.all().order({ desc: c => c.ts })
      `);
      console.log("Raw fetch result: Ok");

      if (Array.isArray(result.data.data)) {
        setComments(
          result.data.data.map((comment) => ({
            id: comment.id,
            name: comment.name || "Anonymous",
            comment: comment.comment,
            insertedAt: parseDate(comment.insertedAt || comment.ts),
          }))
        );
      } else {
        console.error("Unexpected data structure:", result);
        setError("Received unexpected data structure from the server.");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      console.error("Error details:", error.description, error.message);
      console.error("Full error object:", JSON.stringify(error, null, 2));
      setError("Failed to load comments. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [connectionStatus]);

  useEffect(() => {
    if (connectionStatus === "Connected successfully") {
      fetchComments();
    }
  }, [fetchComments, connectionStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (connectionStatus !== "Connected successfully") {
      setError("Cannot add comment: database connection not established.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      console.log("Attempting to add comment...");
      const result = await client.query(fql`
        comments.create({
          name: ${newComment.name || "Anonymous"},
          comment: ${newComment.comment},
          insertedAt: Time.now()
        })
      `);
      console.log("Added comment:", result);

      const newCommentData = {
        id: result.data.id,
        name: result.data.name || "Anonymous",
        comment: result.data.comment,
        insertedAt: parseDate(result.data.insertedAt || result.data.ts),
      };

      setComments((prevComments) => [newCommentData, ...prevComments]);
      setNewComment({ name: "", comment: "" });
    } catch (error) {
      console.error("Error adding comment:", error);
      console.error("Error details:", error.description, error.message);
      console.error("Full error object:", JSON.stringify(error, null, 2));
      setError("Failed to add comment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="comments-section">
      <h3>Commenti</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Il tuo nome"
          value={newComment.name}
          onChange={(e) =>
            setNewComment({ ...newComment, name: e.target.value })
          }
        />
        <textarea
          placeholder="Il tuo commento"
          value={newComment.comment}
          onChange={(e) =>
            setNewComment({ ...newComment, comment: e.target.value })
          }
          required
        />
        <button
          type="submit"
          disabled={isLoading || connectionStatus !== "Connected successfully"}
        >
          {isLoading ? "Invio in corso..." : "Invia commento"}
        </button>
      </form>
      <div id="comments-list">
        {isLoading && comments.length === 0 ? (
          <p>Caricamento commenti...</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="name">{comment.name}</div>
              <div className="date">
                {comment.insertedAt instanceof Date &&
                !isNaN(comment.insertedAt)
                  ? comment.insertedAt.toLocaleString()
                  : "Data non disponibile"}
              </div>
              <div className="content">{comment.comment}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;
