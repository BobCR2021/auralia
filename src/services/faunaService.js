import faunadb from "faunadb";

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNA_SECRET,
});

export const addComment = async (trackId, author, content) => {
  try {
    const result = await client.query(
      q.Create(q.Collection("comments"), {
        data: {
          trackId,
          author,
          content,
          createdAt: q.Now(),
        },
      })
    );
    return result.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const getCommentsByTrackId = async (trackId) => {
  try {
    const result = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("comments_by_track"), trackId)),
        q.Lambda(["createdAt", "ref"], q.Get(q.Var("ref")))
      )
    );
    return result.data.map((item) => ({
      id: item.ref.id,
      ...item.data,
    }));
  } catch (error) {
    console.error("Error getting comments:", error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    await client.query(q.Delete(q.Ref(q.Collection("comments"), commentId)));
    return true;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
