import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import Spinner from "./Spinner";
import "../styles/PostPage.css";
import Comment from "./Comment";

function PostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editImageUrl, setEditImageUrl] = useState("");
    const [editFlag, setEditFlag] = useState("Opinion");

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, []);

    async function fetchPost() {
        setLoading(true);
        const { data } = await supabase
            .from("posts")
            .select("*")
            .eq("id", id)
            .single();
        setPost(data);
        setEditTitle(data.title);
        setEditContent(data.content);
        setEditImageUrl(data.image_url || "");
        setEditFlag(data.flag || "Opinion");
        setLoading(false);
    }

    async function fetchComments() {
        const { data } = await supabase
            .from("comments")
            .select("*")
            .eq("post_id", id)
            .order("created_at", { ascending: true });
        setComments(data || []);
    }

    async function handleUpvote() {
        await supabase
            .from("posts")
            .update({ upvotes: post.upvotes + 1 })
            .eq("id", id);
        fetchPost();
    }

    async function handleDelete() {
        const secret = prompt("Enter Secret Key to Delete");
        if (secret === post.secret_key) {
            await supabase.from("posts").delete().eq("id", id);
            navigate("/");
        } else {
            alert("Wrong secret key!");
        }
    }

    async function handleEdit() {
        const secret = prompt("Enter Secret Key to Edit");
        if (secret === post.secret_key) {
            setEditing(true);
        } else {
            alert("Wrong secret key!");
        }
    }

    async function handleEditSubmit(e) {
        e.preventDefault();
        await supabase
            .from("posts")
            .update({
                title: editTitle,
                content: editContent,
                image_url: editImageUrl,
                flag: editFlag,
            })
            .eq("id", id);
        setEditing(false);
        fetchPost();
    }

    async function handleCommentSubmit(e) {
        e.preventDefault();
        const userId = localStorage.getItem("user_id");
        await supabase
            .from("comments")
            .insert([{ post_id: id, content: comment, user_id: userId }]);
        setComment("");
        fetchComments();
    }

    if (loading) return <Spinner />;

    return (
        <div className="post-page">
            {editing ? (
                <form onSubmit={handleEditSubmit}>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Post Title"
                        required
                    />
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder="Describe your dish..."
                    />
                    <input
                        type="url"
                        value={editImageUrl}
                        onChange={(e) => setEditImageUrl(e.target.value)}
                        placeholder="Image URL"
                    />
                    <select
                        value={editFlag}
                        onChange={(e) => setEditFlag(e.target.value)}
                    >
                        <option value="Opinion">Opinion</option>
                        <option value="Question">Question</option>
                    </select>
                    <button type="submit">Save Changes</button>
                </form>
            ) : (
                <>
                    <h1>{post.title}</h1>
                    {post.image_url && (
                        <img src={post.image_url} alt={post.title} />
                    )}
                    <p>{post.content}</p>
                    <p>Flag: {post.flag}</p>
                    <p>Upvotes: {post.upvotes}</p>
                    <button onClick={handleUpvote}>Upvote</button>
                    <button onClick={handleDelete}>Delete Post</button>
                    <button onClick={handleEdit}>Edit Post</button>
                </>
            )}

            <form onSubmit={handleCommentSubmit} className="comment-form">
                <input
                    className="comment-input"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Leave a comment..."
                />
                <button type="submit" className="comment-submit">
                    Comment
                </button>
            </form>

            <div className="comments-section">
                {comments.length === 0 ? (
                    <p>No comments yet. Be the first to comment!</p>
                ) : (
                    comments.map((c) => <Comment key={c.id} comment={c} />)
                )}
            </div>
        </div>
    );
}

export default PostPage;
