import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <h1>
                <Link to="/">FoodieForum</Link> 🍽️
            </h1>
            <div>
                <Link to="/">Home</Link>
                <Link to="/create">New Post</Link>
            </div>
        </nav>
    );
}

export default Navbar;
