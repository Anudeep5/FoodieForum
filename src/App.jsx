import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import PostPage from "./components/PostPage";
import Navbar from "./components/Navbar";
import "./Styles/App.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/post/:id" element={<PostPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
