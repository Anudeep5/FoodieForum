import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import "../Styles/CreatePost.css";

function CreatePost() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [flag, setFlag] = useState("Opinion");
    const [secretKey, setSecretKey] = useState("");
    const [theme, setTheme] = useState("default");

    async function handleSubmit(e) {
        e.preventDefault();

        const userId =
            localStorage.getItem("user_id") ||
            Math.random().toString(36).substring(2);
        localStorage.setItem("user_id", userId);

        await supabase.from("posts").insert([
            {
                title,
                content,
                image_url: imageUrl,
                secret_key: secretKey,
                user_id: userId,
                flag,
                theme,
                upvotes: 0,
            },
        ]);

        navigate("/");
    }

    return (
        <div className="page-container">
            <div className="create-post">
                <h2>Create New Post</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Post Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Describe your dish..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="External Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <select
                        value={flag}
                        onChange={(e) => setFlag(e.target.value)}
                    >
                        <option value="Opinion">Opinion</option>
                        <option value="Question">Question</option>
                        <option value="Recipe">Recipe</option>
                    </select>
                    <input
                        type="password"
                        placeholder="Set a Secret Key"
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        required
                    />
                    <button type="submit">Create Post</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
