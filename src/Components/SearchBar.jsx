import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, TrendingUp, Loader } from "lucide-react";
import { useProducts } from "../context/ProductsContext";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();
  const { allProducts } = useProducts();

  // Popular kirana categories for suggestions
  const popularCategories = useMemo(() => [
    "Rice", "Wheat Flour", "Cooking Oil", "Pulses", "Spices",
    "Sugar", "Tea", "Coffee", "Milk", "Bread", "Eggs", "Soap",
    "Shampoo", "Toothpaste", "Detergent"
  ], []);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save search term to recent searches
  const saveToRecentSearches = useCallback((searchTerm) => {
    const updatedSearches = [
      searchTerm,
      ...recentSearches.filter(item => item !== searchTerm)
    ].slice(0, 5); // Keep only the 5 most recent searches
    
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  }, [recentSearches]);

  // Debounced search function
  useEffect(() => {
    if (query === "") {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Enhanced search that looks in name, category, and brand
  const filteredProducts = useMemo(() => {
    if (!query) return [];
    
    const lowerQuery = query.toLowerCase();
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      (product.category && product.category.toLowerCase().includes(lowerQuery)) ||
      (product.brand && product.brand.toLowerCase().includes(lowerQuery))
    );
  }, [query, allProducts]);

  // Handle search submission
  const handleSearch = useCallback((e, searchQuery = query) => {
    e?.preventDefault();
    const term = searchQuery.trim();
    
    if (term) {
      saveToRecentSearches(term);
      navigate(`/search?query=${encodeURIComponent(term)}`);
      setShowSuggestions(false);
    }
  }, [query, navigate, saveToRecentSearches]);

  // Handle selecting a suggestion
  const handleSuggestionClick = useCallback((productName) => {
    setQuery(productName);
    handleSearch(null, productName);
  }, [handleSearch]);

  // Render suggestions based on the current state
  const renderSuggestions = () => {
    if (!showSuggestions) return null;

    // Show recent searches and popular categories when input is empty
    if (!query) {
      return (
        <div style={searchBarStyles.suggestionsContainer}>
          {recentSearches.length > 0 && (
            <div style={searchBarStyles.suggestionsGroup}>
              <div style={searchBarStyles.suggestionsHeader}>
                <Clock size={16} />
                <span style={{marginLeft: '8px'}}>Recent Searches</span>
              </div>
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  style={searchBarStyles.suggestionItem}
                  onClick={() => handleSuggestionClick(search)}
                >
                  {search}
                </div>
              ))}
            </div>
          )}
          
          <div style={searchBarStyles.suggestionsGroup}>
            <div style={searchBarStyles.suggestionsHeader}>
              <TrendingUp size={16} />
              <span style={{marginLeft: '8px'}}>Popular Categories</span>
            </div>
            {popularCategories.map((category, index) => (
              <div
                key={index}
                style={searchBarStyles.suggestionItem}
                onClick={() => handleSuggestionClick(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Show search results when there's a query
    return (
      <div style={searchBarStyles.suggestionsContainer}>
        {isLoading ? (
          <div style={{...searchBarStyles.suggestionItem, display: 'flex', alignItems: 'center'}}>
            <Loader size={16} style={{animation: 'spin 1s linear infinite', marginRight: '8px'}} />
            <span>Searching...</span>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div style={searchBarStyles.suggestionsGroup}>
              <div style={searchBarStyles.suggestionsHeader}>Products</div>
              {filteredProducts.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  style={searchBarStyles.suggestionItem}
                  onClick={() => handleSuggestionClick(product.name)}
                >
                  <div>{product.name}</div>
                  {product.category && (
                    <span style={searchBarStyles.suggestionCategory}>{product.category}</span>
                  )}
                </div>
              ))}
            </div>
            
            <div style={searchBarStyles.viewAllItem} onClick={() => handleSearch(null)}>
              View all results for "{query}"
            </div>
          </>
        ) : (
          <div style={searchBarStyles.suggestionsGroup}>
            <div style={searchBarStyles.noResultsItem}>
              No products found. Try searching for:
            </div>
            {popularCategories.slice(0, 3).map((category, index) => (
              <div
                key={index}
                style={searchBarStyles.suggestionItem}
                onClick={() => handleSuggestionClick(category)}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={searchBarStyles.searchBarContainer}>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <form
        onSubmit={handleSearch}
        style={searchBarStyles.searchForm}
      >
        <div style={searchBarStyles.searchInputContainer}>
          <Search size={18} style={searchBarStyles.searchIcon} />
          <input
            type="text"
            placeholder="Search for rice, flour, spices, oil..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            style={searchBarStyles.searchInput}
          />
          {isLoading && <Loader size={16} style={{...searchBarStyles.inputSpinner, animation: 'spin 1s linear infinite'}} />}
        </div>
        <button type="submit" style={searchBarStyles.searchButton}>
          Search
        </button>
      </form>

      {renderSuggestions()}
    </div>
  );
};

// Inline styles for the SearchBar component
const searchBarStyles = {
  searchBarContainer: {
    position: 'relative',
    width: '100%'
  },
  searchForm: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  },
  searchInputContainer: {
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    background: '#f5f5f5',
    borderRadius: '24px',
    padding: '0 16px',
    transition: 'all 0.2s ease'
  },
  searchIcon: {
    color: '#6b7280',
    marginRight: '8px'
  },
  searchInput: {
    flexGrow: 1,
    background: 'transparent',
    border: 'none',
    padding: '12px 0',
    fontSize: '16px',
    outline: 'none',
    width: '100%'
  },
  inputSpinner: {
    color: '#6b7280'
  },
  searchButton: {
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    padding: '12px 20px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    whiteSpace: 'nowrap'
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    marginTop: '8px',
    overflow: 'hidden',
    zIndex: 50,
    maxHeight: '400px',
    overflowY: 'auto'
  },
  suggestionsGroup: {
    padding: '8px 0'
  },
  suggestionsHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px 8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#6b7280',
    borderBottom: '1px solid #f3f4f6'
  },
  suggestionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'background 0.1s ease',
    fontSize: '14px'
  },
  suggestionCategory: {
    fontSize: '12px',
    color: '#6b7280',
    background: '#f3f4f6',
    padding: '2px 8px',
    borderRadius: '12px'
  },
  viewAllItem: {
    color: '#10b981',
    fontWeight: '600',
    padding: '12px 16px',
    cursor: 'pointer',
    borderTop: '1px solid #f3f4f6'
  },
  noResultsItem: {
    color: '#6b7280',
    padding: '12px 16px',
    fontSize: '14px'
  }
};

export default SearchBar;