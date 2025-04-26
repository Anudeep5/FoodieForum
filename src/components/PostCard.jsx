import { Link } from "react-router-dom";
import "../styles/PostCard.css";
import timeAgo from "../utils/timeAgo";

function PostCard({ post }) {
    return (
        <div className="post-card">
            <h2>{post.title}</h2>
            <p>Upvotes: {post.upvotes}</p>
            <p>Posted {timeAgo(post.created_at)}</p>
            <Link to={`/post/${post.id}`}>View Post</Link>
        </div>
    );
}

export default PostCard;
