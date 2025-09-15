import { useState } from "react";
import { Menu, X, FileText, Play, BarChart2, Settings, Sun, Moon } from "lucide-react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Test Case Development");
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { name: "Test Case Development", icon: <FileText size={20} /> },
    { name: "Test Execution", icon: <Play size={20} /> },
    { name: "Reports", icon: <BarChart2 size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  const renderContent = () => {
    switch (active) {
      case "Test Case Development":
        return (
          <>
            <h2 className="text-4xl font-extrabold mb-4">Test Case Development 📝</h2>
            <p className="text-lg md:text-xl opacity-90">
              Build and organize your Playwright test cases efficiently.
            </p>
          </>
        );
      case "Test Execution":
        return (
          <>
            <h2 className="text-4xl font-extrabold mb-4">Test Execution ⚡</h2>
            <p className="text-lg md:text-xl opacity-90">
              Run automated tests and monitor their progress in real-time.
            </p>
          </>
        );
      case "Reports":
        return (
          <>
            <h2 className="text-4xl font-extrabold mb-4">Reports 📊</h2>
            <p className="text-lg md:text-xl opacity-90">
              Analyze detailed execution reports with pass/fail statistics.
            </p>
          </>
        );
      case "Settings":
        return (
          <>
            <h2 className="text-4xl font-extrabold mb-4">Settings ⚙️</h2>
            <p className="text-lg md:text-xl opacity-90">
              Configure your automation environment and preferences.
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"} flex h-screen transition-all duration-300`}>
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} shadow-2xl p-6 z-20 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{ width: collapsed ? "80px" : "256px" }}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            {!collapsed && <h2 className="text-2xl font-bold">Menu</h2>}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors duration-200 hidden md:block text-gray-800"
            >
              {collapsed ? ">" : "<"}
            </button>
          </div>
          
          <ul className="space-y-4 flex-1">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`relative flex items-center gap-3 cursor-pointer font-medium text-lg rounded-lg px-3 py-2 transition-all duration-200 group 
                  ${active === item.name ? "bg-indigo-600 text-white shadow-md" : "hover:text-indigo-600 hover:bg-gray-100"}`}
                onClick={() => {
                  setActive(item.name);
                  setIsOpen(false); // Close mobile menu when item is selected
                }}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-16 bg-gray-900 text-white text-sm rounded px-2 py-1 whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {item.name}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors duration-200 mt-4 text-gray-800"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            {!collapsed && <span className="text-sm">{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Header */}
      <header className="flex items-center justify-between w-full p-4 backdrop-blur-sm bg-white/10 fixed top-0 left-0 z-10 md:hidden">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide drop-shadow-md">
          Automation World
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Main Content */}
      <main className={`flex flex-col items-center justify-center w-full px-6 text-center transition-all duration-300 ${collapsed ? "md:ml-20" : "md:ml-64"}`}>
        <div 
          className="mt-20 max-w-xl"
          style={{ 
            animation: "fadeInUp 0.5s ease-out forwards",
            opacity: 0
          }}
        >
          {renderContent()}
        </div>
      </main>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}