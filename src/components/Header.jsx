import React from "react";

// The header keeps the brand and the theme switch visible at all times.
const Header = ({ theme, toggleTheme }) => (
  <header
    className={`px-8 py-4 flex justify-between items-center border-b ${theme === "dark" ? "border-zinc-800 bg-[#0a0a0a]" : "border-zinc-200 bg-white"}`}
  >
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white text-xl">
        N
      </div>
      <span className="font-bold tracking-tight text-xl">NOTELY</span>
    </div>
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`p-2 rounded-full transition-all ${theme === "dark" ? "bg-zinc-900 text-yellow-400 hover:bg-zinc-800" : "bg-zinc-200 text-indigo-600 hover:bg-zinc-300"}`}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  </header>
);

export default Header;
