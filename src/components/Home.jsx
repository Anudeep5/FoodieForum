import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import PostCard from "./PostCard";
import ThemeSelector from "./ThemeSelector";
import "../styles/Home.css";

function Home() {
    const [posts, setPosts] = useState([]);
    const [orderBy, setOrderBy] = useState("created_at");
    const [searchTerm, setSearchTerm] = useState("");
    const [flag, setFlag] = useState("");

    useEffect(() => {
        fetchPosts();
    }, [orderBy]);

    async function fetchPosts() {
        const { data } = await supabase
            .from("posts")
            .select("*")
            .order(orderBy, { ascending: false });
        setPosts(data);
    }

    const filteredPosts = posts.filter((post) => {
        const matchSearch = post.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchFlag = flag ? post.flag === flag : true;
        return matchSearch && matchFlag;
    });

    return (
        <div className="page-container">
            <div className="home">
                <div className="controls">
                    <input
                        placeholder="Search..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select onChange={(e) => setOrderBy(e.target.value)}>
                        <option value="created_at">Newest</option>
                        <option value="upvotes">Top Rated</option>
                    </select>
                    <select onChange={(e) => setFlag(e.target.value)}>
                        <option value=""></option>
                        <option value="Opinion">Opinion</option>
                        <option value="Question">Question</option>
                        <option value="Recipe">Recipe</option>
                    </select>
                </div>
                <ThemeSelector />
                <div className="posts-grid">
                    {filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
