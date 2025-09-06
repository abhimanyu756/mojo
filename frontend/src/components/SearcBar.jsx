import React from "react";
import { Search } from "lucide-react";

/**
 * A sleek, responsive search bar component.
 * @param {object} props - The component props.
 * @param {string} props.searchTerm - The current value of the search input.
 * @param {Function} props.setSearchTerm - Function to update the search term state.
 * @param {Function} props.handleSearch - Function to execute when the form is submitted.
 */
const ResponsiveSearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-xl mx-auto" // Center the search bar and give it a max-width
      aria-label="Product search"
    >
      <div className="relative flex items-center bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Decorative Search Icon on the left */}
        <div
          className="absolute left-0 pl-4 pointer-events-none"
          aria-hidden="true"
        >
          <Search className="text-gray-400" size={20} />
        </div>

        <input
          type="text"
          placeholder="Search for eco-friendly products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // pl-12 for the left icon, pr-28/pr-32 for the button on the right
          className="w-full py-3 pl-12 pr-28 sm:pr-32 text-gray-800 bg-transparent border-none rounded-full 
                     focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
        />

        {/* Search Button on the right */}
        <button
          type="submit"
          // Positioned absolutely within the relative container
          className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center 
                     rounded-full bg-green-500 text-white font-semibold transition-all duration-300 
                     hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400
                     h-10 w-10 sm:h-auto sm:w-auto sm:py-2 sm:px-6" // Responsive size
          aria-label="Search"
        >
          {/* Show text on larger screens */}
          <span className="hidden sm:inline">Search</span>

          {/* Show only icon on small screens */}
          <Search className="sm:hidden" size={20} />
        </button>
      </div>
    </form>
  );
};

export default ResponsiveSearchBar;
