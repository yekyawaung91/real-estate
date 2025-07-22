import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { useLocation, useNavigate } from 'react-router-dom';

interface SearchBarProps {
  showFilters?: boolean;
  onToggleFilters?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ showFilters = true, onToggleFilters }) => {
  const { searchQuery, setSearchQuery } = useProperty();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  // Check if the route starts with `/category/`
  if (location.pathname.startsWith('/category/')) {
    setLocalQuery('');
    setSearchQuery('');
  }
}, [location.pathname,searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery);

    console.log(localQuery);
    navigate('/search');
  };

  const handleLocationClick = (location: string) => {
    setLocalQuery(location);
    setSearchQuery(location);
    navigate('/search');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex items-center px-4 py-3">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search properties by location, title, or features..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-500 outline-none"
            />
          </div>
          
          <div className="flex items-center space-x-2 px-4">
            {showFilters && (
              <button
                type="button"
                onClick={onToggleFilters}
                className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <Filter className="h-5 w-5" />
              </button>
            )}
            
            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors flex items-center space-x-2"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:block">Search</span>
            </button>
          </div>
        </div>
      </form>

      {/* Quick location suggestions */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 w-full text-center">
          Popular locations:
        </div>
        {['All', 'Yangon', 'Mandalay', 'Naypyidaw', 'Bagan', 'Taunggyi'].map((location) => (
          <button
            key={location}
            onClick={() => handleLocationClick(location === 'All' ? '' : location)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors
              ${localQuery === (location === 'All' ? '' : location)
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-700 dark:hover:text-emerald-300'
              }`}
          >
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </button>
        ))}
      </div>

    </div>
  );
};

export default SearchBar;