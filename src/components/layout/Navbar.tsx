import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 border-b 
    bg-white/80 dark:bg-gray-900/80 backdrop-blur"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-tight">TaskFlow</h1>
        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Nav Links (future scalable) */}
          <span className="hidden md:block text-sm text-gray-500 dark:text-gray-400">
            Smart Task Manager
          </span>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border 
  hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
