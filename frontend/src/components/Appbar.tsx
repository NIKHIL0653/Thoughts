import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard"; // Import the Avatar component
import { useState, useEffect } from "react";
import logo from '../assets/thoughts_logo.png';

export const Appbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Get the current user's name from localStorage and extract the first letter
  const userName = localStorage.getItem("username") || "User";
  const userInitial = userName[0].toUpperCase(); // Default to 'U' if name is not available

  const handleSignOut = () => {
    // Clear user data from localStorage
    localStorage.removeItem("username");
    // Redirect to sign-in page
    navigate("/signin");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  const closeDropdown = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest('.dropdown')) {
      setDropdownOpen(false);
    }
  };

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div className="border-b flex justify-between px-10 py-4 items-center">
      <div className="font-medium">
        <Link to="/blogs">
        <img 
            src={logo}  // Replace with your actual logo path
            alt="Blog Logo" 
            className="h-12 w-auto" // Adjust size as needed
          />
        </Link>
      </div>
      <div className="flex items-center relative">
        <button
          type="button"
          onClick={() => navigate("/publish")}
          className="mr-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
        >
          What's on Your Mind!?
        </button>
        
        {/* Avatar button to toggle dropdown */}
        <div className="relative dropdown">
          <div onClick={toggleDropdown} className="cursor-pointer flex items-center">
            <Avatar 
              name={userInitial} 
              size="small" // Adjust size as needed
            />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                Signed in as <br />
                <span className="font-semibold">{userName}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};