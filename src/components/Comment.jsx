import "../Styles/Comment.css";
import timeAgo from "../utils/timeAgo";

function Comment({ comment }) {
    return (
        <div className="comment">
            <p>
                <strong>User:</strong> {comment.user_id}
            </p>
            <p>{comment.content}</p>
            <p>
                Posted {timeAgo(comment.created_at)}
            </p>
        </div>
    );
}

export default Comment;
