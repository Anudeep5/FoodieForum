import { useState } from "react";
import "../styles/ThemeSelector.css";

function ThemeSelector() {
    const [theme, setTheme] = useState("default");

    function changeTheme(newTheme) {
        document.documentElement.setAttribute("data-theme", newTheme);
        setTheme(newTheme);
    }

    return (
        <div className="theme-selector">
            <button onClick={() => changeTheme("light")}>Light</button>
            <button onClick={() => changeTheme("dark")}>Dark</button>
            <button onClick={() => changeTheme("fun")}>Fun</button>
        </div>
    );
}

export default ThemeSelector;
