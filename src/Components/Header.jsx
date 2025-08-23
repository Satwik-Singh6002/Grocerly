import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Store, User, Heart, Search, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import AuthDropdown from "./AuthDropdown";

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowMobileSearch(false);
      setShowMobileMenu(false);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Mobile menu button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="logo-link">
            <div className="logo-container">
              <Store size={26} className="store-icon" />
              <h1 className="logo-text">Grocerly</h1>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="desktop-search">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-container">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for rice, flour, spices, oil..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Action Icons */}
          <div className="actions-container">
            {/* Mobile Search Toggle - Hidden on desktop */}
            <button
              className="icon-button mobile-search-btn"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              aria-label="Search"
            >
              <Search size={22} />
            </button>

            {/* Wishlist icon */}
            <Link
              to="/wishlist"
              className="icon-link wishlist-icon"
              aria-label="Wishlist"
            >
              <Heart size={22} />
            </Link>

            {/* Profile / Auth */}
            <div className="auth-container">
              <AuthDropdown icon={<User size={22} />} />
            </div>

            {/* Cart - Hidden on mobile */}
            <Link
              to="/cart"
              className="cart-link desktop-cart"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="cart-badge">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search - Appears below header when activated */}
        {showMobileSearch && (
          <div className="mobile-search-container">
            <form onSubmit={handleSearch} className="mobile-search-form">
              <div className="mobile-search-input-container">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for rice, flour, spices, oil..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mobile-search-input"
                  autoFocus
                />
                <button type="submit" className="mobile-search-button">
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="mobile-menu">
            <nav className="mobile-nav">
              <Link to="/" className="mobile-nav-link" onClick={() => setShowMobileMenu(false)}>
                <i className="fas fa-home"></i> Home
              </Link>
              <Link to="/wishlist" className="mobile-nav-link" onClick={() => setShowMobileMenu(false)}>
                <i className="fas fa-heart"></i> Wishlist
              </Link>
              {/* Cart option in mobile menu with icon instead of text */}
              <Link to="/cart" className="mobile-nav-link cart-option" onClick={() => setShowMobileMenu(false)}>
                <div className="cart-option-content">
                  <i className="fas fa-shopping-cart"></i> Cart
                  {totalItems > 0 && (
                    <span className="cart-count-mobile">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Link>
            </nav>
          </div>
        )}
      </header>

      <style jsx>{`
        .header {
          background-color: #fff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
        }
        
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: #374151;
          cursor: pointer;
          padding: 8px;
        }
        
        .logo-link {
          text-decoration: none;
          color: inherit;
          display: flex;
          align-items: center;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .store-icon {
          color: #10b981;
        }
        
        .logo-text {
          font-weight: bold;
          color: #10b981;
          margin: 0;
          font-size: 22px;
        }
        
        .desktop-search {
          flex: 1;
          max-width: 600px;
          margin: 0 30px;
        }
        
        .search-form {
          display: flex;
          width: 100%;
        }
        
        .search-input-container {
          position: relative;
          flex-grow: 1;
          display: flex;
          align-items: center;
          background: #f5f5f5;
          border-radius: 24px;
          padding: 0 16px;
          width: 100%;
        }
        
        .search-icon {
          color: #6b7280;
          margin-right: 8px;
        }
        
        .search-input {
          flex-grow: 1;
          background: transparent;
          border: none;
          padding: 12px 0;
          font-size: 16px;
          outline: none;
          width: 100%;
        }
        
        .search-button {
          background: #10b981;
          color: white;
          border: none;
          border-radius: 24px;
          padding: 12px 20px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
          white-space: nowrap;
          margin-left: 10px;
        }
        
        .search-button:hover {
          background: #0da271;
        }
        
        .actions-container {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .icon-button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          color: #374151;
          padding: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 50%;
        }
        
        .icon-button:hover {
          color: #10b981;
          background: #f3f4f6;
        }
        
        .icon-link {
          display: flex;
          align-items: center;
          color: #374151;
          text-decoration: none;
          padding: 8px;
          transition: all 0.2s ease;
          border-radius: 50%;
        }
        
        .icon-link:hover {
          color: #10b981;
          background: #f3f4f6;
        }
        
        .auth-container {
          display: flex;
          align-items: center;
        }
        
        .cart-link {
          position: relative;
          display: flex;
          align-items: center;
          color: #374151;
          text-decoration: none;
          padding: 8px;
          transition: all 0.2s ease;
          border-radius: 50%;
        }
        
        .cart-link:hover {
          color: #10b981;
          background: #f3f4f6;
        }
        
        .cart-badge {
          position: absolute;
          top: 2px;
          right: 2px;
          background-color: #ef4444;
          color: white;
          font-size: 11px;
          font-weight: bold;
          padding: 2px 5px;
          border-radius: 50%;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .mobile-search-container {
          padding: 12px 15px;
          background: #f8f9fa;
          border-top: 1px solid #e9ecef;
          animation: slideDown 0.3s ease;
        }
        
        .mobile-search-form {
          display: flex;
          width: 100%;
        }
        
        .mobile-search-input-container {
          position: relative;
          flex-grow: 1;
          display: flex;
          align-items: center;
          background: #f5f5f5;
          border-radius: 24px;
          padding: 0 16px;
        }
        
        .mobile-search-input {
          flex-grow: 1;
          background: transparent;
          border: none;
          padding: 12px 0;
          font-size: 16px;
          outline: none;
          width: 100%;
        }
        
        .mobile-search-button {
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 8px;
        }
        
        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }
        
        .mobile-nav {
          display: flex;
          flex-direction: column;
          padding: 20px;
        }
        
        .mobile-nav-link {
          padding: 12px 16px;
          color: #374151;
          text-decoration: none;
          border-radius: 6px;
          transition: background 0.2s ease;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .mobile-nav-link:hover {
          background: #f3f4f6;
          color: #10b981;
        }
        
        .cart-option-content {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }
        
        .cart-count-mobile {
          background-color: #ef4444;
          color: white;
          font-size: 12px;
          font-weight: bold;
          padding: 2px 8px;
          border-radius: 10px;
          min-width: 20px;
          text-align: center;
          position: absolute;
          top: -8px;
          left: 16px;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive styles */
        @media (max-width: 1023px) {
          .desktop-search {
            max-width: 450px;
            margin: 0 20px;
          }
          
          .logo-text {
            font-size: 20px;
          }
        }
        
        @media (max-width: 767px) {
          .header-container {
            padding: 10px 15px;
          }
          
          .mobile-menu-btn {
            display: flex;
          }
          
          .desktop-search {
            display: none;
          }
          
          .mobile-search-btn {
            display: flex;
          }
          
          .wishlist-icon {
            display: none;
          }
          
          .desktop-cart {
            display: none;
          }
          
          .logo-text {
            font-size: 18px;
          }
          
          .actions-container {
            gap: 12px;
          }
        }
        
        @media (min-width: 768px) {
          /* Hide mobile search button on desktop */
          .mobile-search-btn {
            display: none;
          }
        }
        
        @media (max-width: 480px) {
          .header-container {
            padding: 8px 12px;
          }
          
          .logo-text {
            font-size: 16px;
          }
          
          .actions-container {
            gap: 8px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;